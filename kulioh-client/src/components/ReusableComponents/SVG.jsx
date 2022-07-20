import React from "react";
import "../../css/SVG.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ReactTooltip from "react-tooltip";

const SVG = ({ theData, theClass }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["%complete", "%uncomplete"],
    datasets: [
      {
        data: [Math.floor(theData), 100 - Math.floor(theData)],
        backgroundColor: ["#2bcbef", "#ff6384"],
        borderColor: ["#2bcbef", "#ff6384"],
        borderWidth: 1,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 80).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = `${Math.floor(theData)}%`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  let options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    animationSteps: 100,
    animationEasing: "easeInOutQuart",
    events: [],
  };

  return (
    <div className={theClass}>
      {" "}
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
};

export default SVG;
