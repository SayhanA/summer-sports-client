import { useContext } from 'react';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';

const ContinueLogin = () => {
    const { handleGoogleLogin } = useContext(AuthContext);

    const googleLogin = () => {
        handleGoogleLogin()
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    
    return (
        <div className='w-9/12 mx-auto flex gap-5 justify-center mb-10'>
            <button onClick={googleLogin} className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-blue-400">
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" />
            </button>
            <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-blue-500">
                <FaFacebookF className='w-full h-full text-blue-500' />
            </button>
            <button className="h-14 w-14 hover:scale-110 transition-all overflow-hidden border-4 rounded-full p-2 border-black">
                <FaGithub className='w-full h-full text-black' />
            </button>

        </div>
    );
};

export default ContinueLogin;