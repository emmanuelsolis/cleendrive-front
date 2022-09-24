//importamos pages
import { EditProfile } from '../components';
import {AuthPage, ProfilePage, RegisterCarPage, MainPage, CarsDetails} from '../pages'//import v2
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
    }
]
}

export default routes;