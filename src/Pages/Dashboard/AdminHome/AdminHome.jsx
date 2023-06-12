import { FaChalkboard, FaUsers, FaWallet } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Cahert from "./Cahert";
import PaiChart from "./PaiChart";


const AdminHome = () => {
    const [axiosSecure] = useAxiosSecure();
    const [data, setData] = useState({});
    const [chart, setChart] = useState([]);

    axiosSecure.get('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/admin-stats')
        .then(res => {
            setData(res.data)
        })

    useEffect(() => {
        fetch('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/payment')
            .then(res => res.json())
            .then(data => {
                setChart(data)
            })
    }, [])

    // console.log(data)
    return (
        <div className="w-[90%]">
            <div className="grid grid-cols-3 gap-[3%] ">
                <div className="bg-gradient-to-r from-[#D1A054] to-[#D1A05480] h-[170px] rounded-xl shadow-xl flex justify-center items-center">
                    <div className=" flex justify-center items-center text-6xl rounded-full text-white"> <FaWallet /> </div>
                    <div className="">
                        <h2 className="text-5xl font-bold text-white pl-4">{data.revenue?.split(0, 2)}$</h2>
                        <p className="text-2xl ml-4 font-bold font-serif text-white">Revenue</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#368BF2] to-[#368BF280] h-[170px] rounded-xl shadow-xl flex justify-center items-center">
                    <div className=" flex justify-center items-center text-6xl rounded-full text-white"> <FaUsers /> </div>
                    <div className="">
                        <h2 className="text-5xl font-bold text-white pl-4 font-serif">{data.users}n</h2>
                        <p className="text-2xl ml-4 font-bold font-serif text-white">Students</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#BB34F5] to-[#BB34F580] h-[170px] rounded-xl shadow-xl flex justify-center items-center">
                    <div className=" flex justify-center items-center text-6xl rounded-full text-white"> <FaChalkboard /> </div>
                    <div className="">
                        <h2 className="text-5xl font-bold text-white pl-4 font-serif">{data.classes}s</h2>
                        <p className="text-2xl ml-4 font-bold font-serif text-white">Total Classes</p>
                    </div>                </div>
                {/* <div className="bg-gradient-to-r from-[#BB34F5] to-[#BB34F580] h-[170px] rounded-xl shadow-xl flex justify-center items-center">
                    <div className="bg-blue-100 w-12 h-12 flex justify-center items-center text-3xl text-blue-500 rounded-full border-2 border-blue-200"> <FaUsers /> </div>
                </div> */}
            </div>
            <div className="grid grid-cols-2 gap-8" style={{gridTemplateColumns: "60% 37%"}}>
                <div className="w-full min-h-[300px] bg-white mt-8 rounded-xl p-10">
                    <Cahert chart={chart} />
                </div>
                <div className=" bg-white mt-8 rounded-xl p-10">
                    <PaiChart chart={chart} />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;