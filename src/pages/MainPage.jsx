import { LayoutPage } from '../components';
import { Routes, Route } from 'react-router-dom';
import mainroutes  from '../config/mainroutes';


const MainPage = (props) => {
    return (
        <LayoutPage {...props}>
            <Routes>
                {mainroutes(props).map(
                    ({path, element}, index_route) => (
                        <Route key= {path} {...{path, element}}/>
                    )
                )}
            </Routes>
        </LayoutPage>
    )
}

export default MainPage