import { MyProfile, CarList, ListServices, TableOrders, HomePage  } from "../pages";
import { EditProfile } from "../components";

const mainroutes = (props) => {
  return [
    {
        path: "/",
        element: <HomePage {...props}/>
    },
    {
        path: "/mi-perfil",
        element: <MyProfile {...props} />
    },
    {
        path: "/vehiculos",
        element: <CarList {...props} />
    },
    {
        path: "/editar",
        element: <EditProfile {...props} />
    },
    {
        path: "/servicios",
        element: <ListServices {...props}/>
    },
    {
        path: "/mis-ordenes",
        element: <TableOrders {...props}/>
    }
  ]
}

export default mainroutes
