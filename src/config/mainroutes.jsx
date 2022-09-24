import { MyProfile, CarsDetails,  } from "../pages";
import { EditProfile } from "../components";

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
    },
    {
        path: "/editar",
        element: <EditProfile {...props} />
    },
  ]
}

export default mainroutes
