
import { Outlet } from 'react-router-dom';
import NavBar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { motion, useScroll } from 'framer-motion';

const Main = () => {
    const { scrollYProgress } = useScroll();

    return (
        <div className=''>
            <motion.div
                className="progress-bar z-50"
                style={{ scaleX: scrollYProgress }}
            />
            <NavBar />
            <Outlet />
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default Main;