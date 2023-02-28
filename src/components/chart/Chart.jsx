import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data, aspect, title, yLabel1, yLabel2, xLabel}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C1292E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#C1292E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="total2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#345995" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#345995" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xLabel} stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={yLabel1}
            stroke="#C1292E"
            fillOpacity={1}
            fill="url(#total1)"
            activeDot={{strokeWidth:1 ,r:4}}
          />
          <Area
            type="monotone"
            dataKey={yLabel2}
            stroke="#345995"
            fillOpacity={0.5}
            fill="url(#total2)"
            activeDot={{strokeWidth:1 ,r:4}}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
