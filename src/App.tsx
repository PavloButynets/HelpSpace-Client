import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="App">
       <header className="App-header">
         <p>
           <button onClick={() => setCount((count) => count + 1)}/>
         </p>
       </header>
         <span>{count}</span>
        </div>
    </>
  )
}

export default App
