import { Outlet } from "react-router-dom"
import { AppRouter } from "./routes/AppRouter"

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Outlet />
      </div>
    </>
  )
}

export default App
