import { Paper, styled } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Wrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 600,
  backgroundColor: "#FFF",
}));

const MyTitle = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  color: "#444",
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Lượt truy cập",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function VisitorChart() {
  const labels = React.useMemo(() => {
    const labels = [];
    console.log(moment().format());
    for (let i = 0; i < 7; i++) {
      labels.push(
        moment()
          .subtract(7 - i, "days")
          .format("DD/MM")
      );
    }
    return labels;
  }, []);

  const data = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Số lượt truy cập",
          data: labels.map(() => Math.ceil(Math.random() * 100)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  }, [labels]);

  return (
    <Wrapper>
      <MyTitle>Lượt truy cập</MyTitle>
      <Line options={options} data={data} />
    </Wrapper>
  );
}

export default React.memo(VisitorChart);
