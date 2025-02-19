import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./component/RootLayout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Books} from "./pages/Books.tsx";
import {Users} from "./pages/Users.tsx";
import {Orders} from "./pages/Orders.tsx";

function App() {
  const routers = createBrowserRouter([
    {
      path: "",
      element: <RootLayout/>,
      children: [
        {path: "", element: <Dashboard/>},
        {path: "/books", element: <Books/>},
        {path: "/users", element: <Users/> },
        {path: "/orders", element: <Orders/> },
      ]
    }
  ])
  return (
    <><RouterProvider router={routers}/></>
  )
}

export default App
