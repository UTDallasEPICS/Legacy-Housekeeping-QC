import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {theme} from "../../../theme";

interface MembersPerformanceChartProps {
  memberData: { id: number, amount: number }[];
}

const MembersPerformanceChart: React.FC<MembersPerformanceChartProps> = ({ memberData }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart 
        data={memberData} 
        style={{ 
          overflow: 'visible', 
          marginTop: '5px', 
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <Line 
          type="monotone" 
          dataKey="amount" 
          stroke={theme.palette.secondary.main} 
          strokeWidth="2" 
          animationDuration={500}
        />
        <XAxis dataKey="id" axisLine={{ stroke: '#000000' }}/>
        <YAxis ticks={[25, 50, 75, 100]} axisLine={{ stroke: '#000000' }}/>
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MembersPerformanceChart;