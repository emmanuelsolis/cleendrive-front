//importamos pages
import { EditProfile, EditCar } from '../components';
import {AuthPage, ProfilePage, RegisterCarPage, MainPage, CarsDetails,TableOrders, OrderDetails} from '../pages'//import v2
const routes = (props) =>{
//<Route path="/" element={componente}/>

return [
    {
        path:'/',//Homepage
        element:<h1>Este el es Home</h1>
    },
    {
        path:'/main/*',
        element:<MainPage {...props}/>
    },
    {
        path: '/login',
        element: <AuthPage {...props}/>
    },
    {
        path:"/signup",
        element: <AuthPage {...props}/>
    },
    {
        path: '/profile',
        element:<ProfilePage {...props}/>
    },
    {
        path: '/register-car',
        element:<RegisterCarPage {...props}/>
    },
    {
        path: '/edit-car/:id',
        element:<RegisterCarPage {...props}/>
    },
    {
        path: '/upload/single',
        element:<RegisterCarPage {...props}/>
    },
    {
        path: '/car/get-cars',
        element:<CarsDetails {...props}/>
    },
    {
        path: '/user/edit-profile',
        element:<EditProfile {...props}/>
    },
    {
        path: '/car/edit-car',
        element:<EditCar {...props}/>
    }, 
    {
        path: '/pages/MyOrders',
        element:<TableOrders {...props}/>
    },
    {
        path: '/pages/OrderDetails',
        element:<OrderDetails {...props}/>
    }
]
}

export default routes;