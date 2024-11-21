import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select, Input } from "antd";

const { Option } = Select;

const GraphComponent = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  // Preprocess data to group by weeks for the selected month
  const getWeeklyData = (month) => {
    const filteredData = data.filter((item) => item.month === month);
    const weeks = [
      { week: "Week 1", value: filteredData[0]?.value || 0 },
      { week: "Week 2", value: filteredData[1]?.value || 0 },
      { week: "Week 3", value: filteredData[2]?.value || 0 },
      { week: "Week 4", value: filteredData[3]?.value || 0 },
    ];
    return weeks;
  };

  const weeklyData = getWeeklyData(selectedMonth);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Monthly Weekly Analysis</h3>

        <div className="flex items-center gap-2">
          {/* Month Selector */}
          <Select
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
            style={{ width: 120 }}
          >
            <Option value="Jan">Jan</Option>
            <Option value="Feb">Feb</Option>
            <Option value="Mar">Mar</Option>
            <Option value="Apr">Apr</Option>
            <Option value="May">May</Option>
            <Option value="Jun">Jun</Option>
            <Option value="Jul">Jul</Option>
            <Option value="Aug">Aug</Option>
            <Option value="Sep">Sep</Option>
            <Option value="Oct">Oct</Option>
            <Option value="Nov">Nov</Option>
            <Option value="Dec">Dec</Option>
          </Select>
        </div>
      </div>

      {/* Graph Section */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            stroke="#888888"
            tick={{ fontSize: 12 }}
            label={{ value: "Weeks", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#888888"
            tickFormatter={(value) => `$${value}`}
            label={{ value: "Amount", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              border: "1px solid #d9d9d9",
            }}
            labelStyle={{ color: "#333333" }}
            formatter={(value) => `$${value}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6b46c1"
            strokeWidth={3}
            dot={{ fill: "#6b46c1", r: 5 }}
            activeDot={{ r: 7, stroke: "#6b46c1", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;
