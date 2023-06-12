
import { PieChart, Pie, Cell } from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PaiChart = ({ chart }) => {
    console.log(chart)

    return (
        <>
            <PieChart width={400} height={220}>
                <Pie
                    data={chart}
                    cx={180}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="price"
                >
                    {chart?.map((entry, index) => (
                        <Cell name={entry.sport} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}

                </Pie>

            </PieChart>
            <div className="flex overflow-hidden flex-wrap gap-3">
                {
                    chart?.map((data, index) => <div key={index} className="flex items-center justify-center">
                        <div className="text-black">{data.sport}</div>
                        <div className={`h-4 w-6 bg-[#134744]`}></div>
                    </div>)
                }
            </div>
        </>
    );
};

export default PaiChart;