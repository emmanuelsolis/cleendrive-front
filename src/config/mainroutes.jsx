import { ProfilePage, RegisterCarPage,  } from "../pages";

import React from 'react'

const mainroutes = (props) => {
  return [
    {
        path: "/dashboard",
        element: <h1>Dashboard</h1>
    },
    {
        path: "/mi-perfil",
        element: <ProfilePage {...props} />
    },
    {
        path: "/vehiculos",
        element: <RegisterCarPage {...props} />
    }
  ]
}

export default mainroutes
