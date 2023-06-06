
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <p>This is main page</p>
            <Outlet />
        </div>
    );
};

export default Main;