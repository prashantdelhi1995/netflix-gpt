import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Browse from './Browse'
import Header from './Header'


const Body = () => {




    
    const appRoute= createBrowserRouter([
        {
            path:"/",
            element:<Header />

        },
        {
            path:"/browse",
            element:<Browse />
        },
        {
            path:"/header",
            element:<Header />
        }
    ])
  return (
    <div>
    <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body