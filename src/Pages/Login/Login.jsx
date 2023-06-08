import  { useContext, useState } from 'react';
import { FaFacebookF, FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
    const [show, setShow] = useState(false);
    // const { user } = useContext(AuthContext)
    // console.log(user)
    
    return (
        <div className="">
            <div className='h-[75px]'></div>
            <div className="grid grid-cols-2 justify-center items-center h-[100vh]">
                <div className="text-center lg:text-left ml-20">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <form className="card flex-shrink-0 w-full lg:w-8/12 mx-auto shadow-2xl bg-base-100">
                    <div className="card-body px-14">
                        <h3 className='text-3xl font-bold text-center py-5'>LogIn</h3>

                        <div className="relative z-0 w-full mb-6 group">
                            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                        </div>

                        <div className="form-control">

                            <div className="relative z-0 w-full mb-6 group">
                                <input type={show ? "text" : "password"} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <div onClick={() => setShow(!show)} className='absolute right-5 top-3 text-xl text-gray-400 z-10'>
                                    {
                                        show ? <FaRegEye /> : <FaRegEyeSlash />
                                    }
                                </div>
                                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className="flex items-start ">
                                <div className="flex items-center h-5">
                                    <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                            <p>Already have an account?<Link to='/signUp' className='text-blue-500'> SignUp </Link></p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 mx-20">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-4 text-gray-500">OR</span>
                        <hr className="flex-grow border-gray-300" />

                    </div>

                    <div className='w-9/12 mx-auto flex gap-5 justify-center mb-10'>
                        <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-blue-400">
                            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
                        </button>
                        <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-blue-500">
                            <FaFacebookF className='w-full h-full text-blue-500' />
                        </button>
                        <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-black">
                            <FaGithub className='w-full h-full text-black' />
                        </button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;