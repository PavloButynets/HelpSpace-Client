import { useState, useEffect, useRef, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  connection_status: (data: { connected: boolean; message: string }) => void
  auth_response: (data: { success: boolean; message?: string }) => void
  pong: (data: { timestamp: number }) => void
  chat_message: (data: any) => void
}

interface ClientToServerEvents {
  auth: (
    data: { userId: string },
    callback: (response: { success: boolean; message?: string }) => void
  ) => void
  chat_message: (message: any) => void
  ping: () => void
}

type ConnectionStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error'

interface UseSocketIOReturn {
  connect: (userId: string) => void
  disconnect: () => void
  sendMessage: (eventName: string, data: any) => void
  connectionStatus: ConnectionStatus
  lastMessage: any
}

export function useSocketIO(url: string): UseSocketIOReturn {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('idle')
  const [lastMessage, setLastMessage] = useState<any>(null)

  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null)
  const userIdRef = useRef<string | null>(null)
  const pingIntervalRef = useRef<number | null>(null)

  const connect = useCallback(
    (userId: string) => {
      userIdRef.current = userId

      // Disconnect existing socket if any
      if (socketRef.current) {
        socketRef.current.disconnect()
      }

      console.log(`Creating Socket.IO connection to ${url}`)
      setConnectionStatus('connecting')

      // Create socket
      const socket = io(url, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000
      }) as Socket<ServerToClientEvents, ClientToServerEvents>

      socketRef.current = socket

      // Set up event handlers
      socket.on('connect', () => {
        socket.emit(
          'auth',
          { userId },
          (response: { success: boolean; message?: string }) => {
            setConnectionStatus(response.success ? 'connected' : 'error')
          }
        )
      })

      // Simplified event handlers
      socket.on('connection_status', (data) => setLastMessage(data))
      socket.on('auth_response', (data) => {
        setConnectionStatus(data.success ? 'connected' : 'error')
        setLastMessage(data)
      })
      socket.on('chat_message', (data) => setLastMessage(data))
      socket.on('pong', (data) => setLastMessage(data))

      // Error handlers
      socket.on('connect_error', () => setConnectionStatus('error'))
      socket.on('disconnect', () => setConnectionStatus('disconnected'))

      // Reconnection handling
      socket.io.on('reconnect', () => {
        if (userIdRef.current) {
          socket.emit(
            'auth',
            { userId: userIdRef.current },
            (response: { success: boolean }) => {
              setConnectionStatus(response.success ? 'connected' : 'error')
            }
          )
        }
      })

      // Set ping interval
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
      pingIntervalRef.current = window.setInterval(() => {
        if (socket.connected) socket.emit('ping')
      }, 30000)

      return () => {
        if (pingIntervalRef.current) clearInterval(pingIntervalRef.current)
        socket.disconnect()
      }
    },
    [url]
  )

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
      setConnectionStatus('disconnected')
    }
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current)
      pingIntervalRef.current = null
    }
  }, [])

  const sendMessage = useCallback((eventName: string, data: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(eventName as keyof ClientToServerEvents, data)
      return true
    }
    return false
  }, [])

  // Cleanup on unmount
  useEffect(() => () => disconnect(), [disconnect])

  return {
    connect,
    disconnect,
    sendMessage,
    connectionStatus,
    lastMessage
  }
}
