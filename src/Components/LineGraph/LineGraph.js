import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const LineGraph = ({ sales }) => {

const monthlyData = new Map();

sales.forEach(point => {
const month = new Date(point.weekEnding).toLocaleString('en', { month: 'short' }).toUpperCase();

if (!monthlyData.has(month)) {
monthlyData.set(month, {
month,
retailSales: point.retailSales,
wholesaleSales: point.wholesaleSales,
count: 1
});
} else {
const existing = monthlyData.get(month);
monthlyData.set(month, {
month,
retailSales: existing.retailSales + point.retailSales,
wholesaleSales: existing.wholesaleSales + point.wholesaleSales,
count: existing.count + 1
});
}
});

const chartData = Array.from(monthlyData.values()).map(data => ({
month: data.month,
retailSales: Math.round(data.retailSales / data.count),
wholesaleSales: Math.round(data.wholesaleSales / data.count)
}));

const monthOrder = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
chartData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

return (
<div className="w-full p-8">
<div className="text-xl font-semibold mb-4">Monthly Average Sales Comparison</div>
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
domain={[-2000000, 2000000]}
axisLine={false}
tickLine={false}
tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
/>
<Tooltip
formatter={value => [`$${value.toLocaleString()}`, undefined]}
/>
<Legend />
<Line
type="monotone"
dataKey="retailSales"
name="Retail Sales"
dot={false}
strokeWidth={3}
stroke="rgb(70, 168, 246)"
/>
<Line
type="monotone"
dataKey="wholesaleSales"
name="Wholesale Sales"
dot={false}
strokeWidth={3}
stroke="rgb(246, 70, 93)"
/>
</LineChart>
</div>
);
};

export default LineGraph;