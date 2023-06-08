
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';


const Main = () => {
    return (
        <div className=''>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;