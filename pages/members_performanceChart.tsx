import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MembersPerformanceChartProps {
  data: { name: string, Score: number }[];
}

const MembersPerformanceChart: React.FC<MembersPerformanceChartProps> = ({ data }) => {
  return (
    <LineChart width={500} height={325} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="Score" stroke="#8884d8" />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default MembersPerformanceChart;