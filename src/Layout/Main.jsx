
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';


const Main = () => {
    return (
        <div className=''>
            <NavBar />
            <Outlet />
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default Main;