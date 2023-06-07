
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Navbar/Navbar';


const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default Main;