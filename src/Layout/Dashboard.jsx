import { Link, Outlet } from "react-router-dom";
import ActiveLink from "../components/ActiveLink/ActiveLink";
import { FaHistory, FaHome, FaList, FaListUl, FaTasks, FaUserFriends, FaUsers } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import useTitle from "../hooks/useTitle";
import { SiMetrodelaciudaddemexico } from "react-icons/si";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

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
                <ul className="menu p-4 px-5 h-full bg-[#D1A054]">
                    <div className="my-5 mx-auto">
                        <Link to='/' className=''>
                            <h3 className='text-xl font-extrabold text-black'>Summer Sport</h3>
                            <p style={{ letterSpacing: "" }} className=' py-2 text-black '>Summer Sports Activities</p>
                        </Link>
                    </div>
                    {
                        isAdmin && <>

                            <li ><ActiveLink to="/dashboard/adminhome"> <div className=" flex gap-3  font-bold py-2 "><FaHome className='text-xl'></FaHome> Admin Home </div></ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/manageclasses"> <div className="py-2 flex gap-3  font-bold "><FaTasks className='text-xl'></FaTasks> Manage Classes </div> </ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/allusers"> <div className=" flex gap-3  font-bold py-2 "><FaUsers className='text-xl'></FaUsers> Manage Users </div> </ActiveLink></li>                            
                        </>
                        
                    }
                    {
                        isInstructor && <>

                            <li className="text-black" ><ActiveLink to="/dashboard/"> <div className="py-2 flex gap-3  font-bold "><FaHome className='text-xl'></FaHome> Instructor Home </div></ActiveLink></li>
                            <li className="text-black" ><ActiveLink to="/dashboard/instructorclasses"> <div className=" flex gap-3  font-bold py-2 "><FaListUl className='text-xl'></FaListUl> Classes </div> </ActiveLink></li>
                            <li className="text-black" ><ActiveLink to="/dashboard/addclasses"> <div className=" flex gap-3  font-bold py-2 "><SiMetrodelaciudaddemexico className='text-xl'></SiMetrodelaciudaddemexico> Add A Class </div> </ActiveLink></li>
                        </>
                        
                    }
                    {
                        isAdmin || !isInstructor && <>

                            <li ><ActiveLink to="/dashboard/home"> <div className="py-2 flex gap-3  font-bold "><FaHome className='text-xl'></FaHome> User Home </div></ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/mycart"> <div className="py-2 flex gap-3  font-bold "><FaList className='text-xl'></FaList> Selected Classes </div> </ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/enrolledclasses"> <div className="py-2 flex gap-3  font-bold "><FaTasks className='text-xl'></FaTasks> Enrolled Classes </div> </ActiveLink></li>
                            <li ><ActiveLink to="/dashboard/paymenthistory"> <div className="py-2 flex gap-3  font-bold "><FaHistory className='text-xl'></FaHistory> Payment History </div> </ActiveLink></li>
                            
                        </>
                        
                    }


                    <hr className="my-10" />
                    <li ><ActiveLink to="/"> <div className="py-1 flex gap-3 text-black font-bold"><FaHome className='text-xl'></FaHome>Home </div> </ActiveLink></li>
                    <li ><ActiveLink to="/classes"> <div className="py-1 flex gap-3 text-black font-bold"><FiMenu className='text-xl'></FiMenu>All Classes </div> </ActiveLink></li>
                    <li ><ActiveLink to="/instructors"> <div className="py-1 flex gap-3 text-black font-bold"> <FaUserFriends className='text-xl'></FaUserFriends> All Instructors </div> </ActiveLink></li>

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;