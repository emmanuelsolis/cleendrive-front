import { MyProfile, CarsDetails,  } from "../pages";

const mainroutes = (props) => {
  return [
    {
        path: "/dashboard",
        element: <h1>Dashboard</h1>
    },
    {
        path: "/mi-perfil",
        element: <MyProfile {...props} />
    },
    {
        path: "/vehiculos",
        element: <CarsDetails {...props} />
    }
  ]
}

export default mainroutes
