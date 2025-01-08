import React from 'react';
import './LineGraph.css';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const LineGraph = ({ sales }) => {

  const chartData = sales.map(point => {
    return ({
      weekEnding: point.weekEnding,
      retailSales: point.retailSales,
      month: new Date(point.weekEnding).toLocaleString('en', { month: 'short' }).toUpperCase(),
    })
  });

  return (
    <div className="container graph-container" >
      <div style={{padding:"2rem"}}>
        <text>Retail Sales</text>
        <LineChart 
          data={chartData}
          width={1260} 
          height={475} 
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            hide
            domain={[-2000000, 2000000]} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="retailSales" 
            dot={false}  
            strokeWidth={3}
            stroke="rgb(70, 168, 246)"
          />
        </LineChart>
      </div>
    </div>
  );
};

export default LineGraph;
