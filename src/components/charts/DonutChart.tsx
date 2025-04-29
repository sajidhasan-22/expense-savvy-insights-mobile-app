
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface DonutChartProps {
  data: {
    name: string;
    value: number;
  }[];
  colors?: string[];
  title?: string;
  className?: string;
}

const DEFAULT_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f43f5e"];

export default function DonutChart({ data, colors = DEFAULT_COLORS, title, className }: DonutChartProps) {
  const [chartData, setChartData] = useState(data);
  
  useEffect(() => {
    // Filter out zero values
    setChartData(data.filter(item => item.value > 0));
  }, [data]);
  
  // Format the tooltip values
  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover text-popover-foreground p-2 rounded shadow">
          <p className="font-medium">{payload[0].name}</p>
          <p>{formatTooltipValue(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {title && <h3 className="text-sm font-medium mb-2 text-center">{title}</h3>}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                const RADIAN = Math.PI / 180;
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                const percent = ((value / chartData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0);
                return percent !== "0" ? (
                  <text
                    x={x}
                    y={y}
                    fill={colors[index % colors.length]}
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className="text-xs font-medium"
                  >
                    {`${percent}%`}
                  </text>
                ) : null;
              }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ fontSize: '12px', paddingTop: '15px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
