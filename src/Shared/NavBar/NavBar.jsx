import { useState } from 'react';
import './NavBar.css'
import ActiveLink from '../../components/ActiveLink/ActiveLink';
import { Link } from 'react-router-dom';
import { FaRegUserCircle, FaTrashAlt } from 'react-icons/fa';
// import DarkMode from '../../component/DarkMode/DarkMode';

const NavBar = () => {
    const [open, setOpen] = useState(false);
    // const [ isAdmin ] = useAdmin();
    const item = false;
    const user = false;

    return (
        <div className="absolute flex items-center bg-[#00000050] w-full lg:px-[5%] z-50 lg:gap-6">
            {/* Menu bar design */}
            <div className='z-40 main px-2 lg:hidden'>
                <input type="checkbox" className='menu-btn' id="menu-btn" />
                <label onClick={() => setOpen(!open)} htmlFor="menu-btn" className='menu-icon'> <span className='nav-icon bg-white'></span> </label>
            </div>
            <div className=" z-20 lg:navbar-center lg:mr-auto relative -left-9 lg:left-0 mr-auto">
                <Link to='/' className='text-white hover:text-yellow-300 transition-all'>
                    <h3 className='text-3xl font-extrabold'>Summer Sport</h3>
                    <p style={{ letterSpacing: "0.3px" }} className='uppercase'>Summer Sports Activities</p>
                </Link>
            </div>

            <div className={`lg:backdrop-blur-0 backdrop-blur-lg w-full lg:text-left text-[#757575]  lg:navbar-end  lg:pl-5 gap-5 font-semibold  flex flex-col items-center lg:w-full  lg:static lg:flex-row absolute lg:top-16 p-5 transition-all ${open ? "top-16" : "-left-[100%]"}  ${location.pathname == '/blog' || location.pathname == '/favorite' ? "" : "text-white"}`}>
                <li className='list-none border-0 border-b-2 md:border-b-0 text-center pb-2 '> <ActiveLink className='hover:text-yellow-300' to="/">Home</ActiveLink></li>
                <li className='list-none border-0 border-b-2 md:border-b-0 text-center pb-2 '> <ActiveLink className='hover:text-yellow-300' to="/instructors">Instructors</ActiveLink></li>
                <li className='list-none border-0 border-b-2 md:border-b-0 text-center pb-2 '> <ActiveLink className='hover:text-yellow-300' to="/classes"> Classes</ActiveLink></li>
                <li className='list-none border-0 border-b-2 md:border-b-0 text-center pb-2 '> <ActiveLink className='hover:text-yellow-300' to="/contact">Contact</ActiveLink></li>
                {/* <li className='list-none border-0 border-b-2 text-center pb-2'>                 <ActiveLink to={isAdmin ? '/dashboard/adminhome' : '/dashboard/userhome'}>Dashboard</ActiveLink></li> */}
            </div>

            <button className="text-white ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            {/* <div className='sm:static absolute top-[60px] right-3' title='Active Dark Mode'>
                <DarkMode />
            </div> */}
            <div>

                {/* { location.pathname == '/login' || location.pathname == '/register' ? "" : "" } */}

                {
                    user && <div className={location.pathname == '/login' || location.pathname == '/register' ? "hidden" : "dropdown dropdown-end z-50"}>
                        <label tabIndex={1} className="btn btn-ghost btn-circle">
                            <div className={` ${location.pathname == '/blog' || location.pathname == '/favorite' || location.pathname == '/aboutUs' ? "indicator" : "text-white indicator"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-sm badge-error indicator-item font-bold">{item.length}</span>
                            </div>

                        </label>
                        <div tabIndex={1} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow rounded-md z-50">
                            <div className="card-body rounded-sm">
                                {item.length === 0 ? <p className=' text-center font-bold'>Please add some recipes</p> : <span className="font-bold text-lg ">{item.length} Items</span>}
                                <div className=''>
                                    {
                                        item.map(id => <p key={id} className=' flex justify-between mb-2'>{id} <FaTrashAlt className='text-red-500' /> </p>)
                                    }
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-warning h-5 btn-block normal-case">Clear all</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

            {
                user ? <div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {/* <img src={user?.photoURL} /> */}
                                {
                                    user.photoURL ? <img src={user.photoURL} title={user && user.displayName} /> : <div className="text-4xl flex justify-center items-center text-gray-500"><FaRegUserCircle /></div>
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                            <li><p>{user.displayName}</p></li>
                            <li>
                                <Link to="/profile" className="justify-between" title='Click Here to see your profile details'>
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            {/* <li><a>Settings</a></li> */}
                            <li title='Click here to logOut'><a className='z-50' >Logout</a></li>
                        </ul>
                    </div>
                </div>
                    : <Link to='/login' className='btn btn-warning lg:px-5 rounded-md normal-case lg:text-[17px] m-2'>LogIn</Link>
            }

        </div>
    );
};

export default NavBar;