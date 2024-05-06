import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {theme} from "../../../theme";

interface MembersPerformanceChartProps {
  memberData: { timestamp: Date, amount: number }[];
}

const MembersPerformanceChart: React.FC<MembersPerformanceChartProps> = ({ memberData }) => {
  // Format date to match recharts expected format
  const formattedData = memberData.map(({ timestamp, amount }) => ({
    timestamp: timestamp ? new Date(timestamp).toISOString().split('T')[0] : 0, // Extracting only the date part
    amount: amount
  }));
  formattedData.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
  
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart 
        data={formattedData}
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
        <XAxis 
          dataKey="timestamp" 
          axisLine={{ stroke: '#000000' }}
        />
        <YAxis 
          ticks={[25, 50, 75, 100]} 
          axisLine={{ stroke: '#000000' }}
        />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MembersPerformanceChart;