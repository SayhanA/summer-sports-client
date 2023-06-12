import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";



const Cahert = ({ chart }) => {


    return (
        <div className="w-full">
            <BarChart width={550} height={300} data={chart}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='price' fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Cahert;