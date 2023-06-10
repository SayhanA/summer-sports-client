import { Link, Outlet } from "react-router-dom";
import ActiveLink from "../components/ActiveLink/ActiveLink";
import { FaHome, FaShoppingBag, FaShoppingCart, FaTasks, FaUsers, FaWallet } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import useCart from "../hooks/useCart";
import useTitle from "../hooks/useTitle";
import { SiMetrodelaciudaddemexico } from "react-icons/si";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    // TODO: load data from the server to have dynamic isAdmin based on Data
    const [isAdmin] = useAdmin();

    useTitle("Dashboard")

    return (
        <div className="drawer lg:drawer-open  bg-base-200">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet />

            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 px-10 w-80 h-full bg-[#D1A054]">
                    <div className="my-5 mx-auto">
                        <Link to='/' className=''>
                            <h3 className='text-3xl font-extrabold text-black'>Summer Sport</h3>
                            <p style={{ letterSpacing: "0.8px" }} className='uppercase py-3  text-black font-bold'>Summer Sports Activities</p>
                        </Link>
                    </div>
                    {
                        isAdmin ? <>

                            <li ><ActiveLink to="/dashboard/"> <div className="py-2 flex gap-3  font-bold text-lg"><FaHome className='text-2xl'></FaHome> Admin Home </div></ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/addclasses"> <div className="py-2 flex gap-3  font-bold text-lg"><SiMetrodelaciudaddemexico className='text-2xl'></SiMetrodelaciudaddemexico> Add A Class </div> </ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/manageclass"> <div className="py-2 flex gap-3  font-bold text-lg"><FaTasks className='text-2xl'></FaTasks> Manage Classes </div> </ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/allusers"> <div className="py-2 flex gap-3  font-bold text-lg"><FaUsers className='text-2xl'></FaUsers> All Users </div> </ActiveLink></li>
                            
                        </>
                            : <>

                                <li ><ActiveLink to="/dashboard/userhome"> <div className="py-3 flex gap-3 text-black font-bold"><FaHome className='text-xl'></FaHome> User Home </div></ActiveLink></li>
                                <li ><ActiveLink to="/paymentHistory"> <div className="py-3 flex gap-3 text-black font-bold"><FaWallet className='text-xl'></FaWallet> Payment history </div> </ActiveLink></li>
                                <li>
                                    <ActiveLink to="/dashboard/myCart"> <FaShoppingCart className='text-xl'></FaShoppingCart>
                                        <div className="indicator py-3">
                                            <span className="indicator-item badge badge-yellow">{cart.length || 0}</span>
                                            <div>My Cart</div>
                                        </div>
                                    </ActiveLink>
                                </li>
                            </>
                    }


                    <hr className="my-10" />

                    {/* <li><a>Sidebar Item 2</a></li> */}
                    <li ><ActiveLink to="/paymentHistory"> <div className="py-3 flex gap-3 text-black font-bold"><FaHome className='text-xl'></FaHome>Home </div> </ActiveLink></li>
                    <li ><ActiveLink to="/paymentHistory"> <div className="py-3 flex gap-3 text-black font-bold"><FiMenu className='text-xl'></FiMenu>Menu </div> </ActiveLink></li>
                    <li ><ActiveLink to="/paymentHistory"> <div className="py-3 flex gap-3 text-black font-bold"> <FaShoppingBag className='text-xl'></FaShoppingBag> shop </div> </ActiveLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;