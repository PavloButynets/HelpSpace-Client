import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { appApi } from '~/redux/apiSlice'
import appMainReducer from '~/redux/reducer'
import snackbarReducer from '~/redux/features/snackbarSlice'

export const store = configureStore({
  reducer: {
    appMain: appMainReducer,
    snackbar: snackbarReducer,
    [appApi.reducerPath]: appApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([appApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
