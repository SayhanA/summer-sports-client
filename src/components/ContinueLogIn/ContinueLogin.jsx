import { useContext } from 'react';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';


const ContinueLogin = () => {
    const { handleGoogleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const googleLogin = () => {
        handleGoogleLogin()
            .then(result => {
                const user = result.user;
                console.log(user)

                const saveUser = { name: user.displayName, email: user.email }

                fetch('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        navigate(from, { replace: true })
                    })

            })
            .catch(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='w-9/12 mx-auto flex gap-5 justify-center mb-10'>
            <button onClick={googleLogin} className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 bg-white shadow-xl">
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
            </button>
            <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2  bg-white shadow-xl">
                <FaFacebookF className='w-full h-full text-blue-500 hover:text-white' />
            </button>
            <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2  bg-white shadow-xl">
                <FaGithub className='w-full h-full text-black' />
            </button>

        </div>
    );
};

export default ContinueLogin;