import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Label, Cell } from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={5}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        cornerRadius={5}

      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        fontSize={17}
        fontWeight={500}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={-20}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.category}`}</text>
      <text
        fontSize={15}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`£${value.toFixed(0)}`}</text>
      <text
        fontSize={14}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={20}
        textAnchor={textAnchor}
        fontWeight={500}
        fill="#667070"
      >
        {`(${(percent * 100).toFixed(1)}%)`}
      </text>
    </g>
  );
};
export const PieComponent = ({ colors, data, view }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  // Calculate the sum of amounts in data
  const totalAmount = data.reduce((sum, entry) => sum + entry.amount, 0);
  data = data.filter((obj) => obj.amount > 0);
  const width = 700
  const height = 600;
  const r = view === "budget" ? 180: 200;

  return (
    <PieChart width={width} height={height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={(width - 50) / 2}
        cy={height / 2}
        innerRadius={r-50}
        outerRadius={r}
        fill="#8884d8"
        dataKey="amount"
        onMouseEnter={onPieEnter}
        cornerRadius={5}
      >
        <Label
          value={`Total ${view === "budget" ? "Budget" : "Expenses"}:`}
          position="centerBottom"
          fontSize="25px"
          dy={-10}
        />
        <Label
          value={`£${totalAmount}`}
          position="centerTop"
          fontSize="22px"
          fontWeight={500}
          fill="#3e4242"
          dy={10}
        />
        {data.map((i) => {
        return <Cell fill={colors[i.category]} cornerRadius={5}  />;
        })}
      </Pie>
    </PieChart>
  );
};

export default PieComponent;
