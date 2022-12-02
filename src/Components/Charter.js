import React from 'react'
import { useLocation, useNavigate,Link } from 'react-router-dom';
import { CSVLink, CSVDownload } from "react-csv";
import { Button } from "react-bootstrap";
import react, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from '../context/UserAuthContext';
import ListGroup from 'react-bootstrap/ListGroup';
import BarGraph from './BarGraph';
import { Bar, Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";


//         {location.state.pollTitle}

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const Charter = () => {

  const navigate = useNavigate();

  const headers = [
    { label: "Number of Votes", key: "number" },
    { label: "Vote", key: "VOTE" },
  ];

  


  const location = useLocation();
  const [pollInfo, setPollInfo] = useState([]);

  useEffect(() => {
    console.log("getPoll clicked, poll_id:" + location.state.pollTitle)
    axios.get("http://localhost:3001/answers", {
      params: { pollTitle: location.state.pollTitle }
    }).then((response) => {
      setPollInfo(response.data);
      console.log(response.data);
    })

  }, []);

  let dataValues = [];
  let dataLabels = [];

  for (let i = 0; i < pollInfo.length; i++) {
    dataValues.push(pollInfo[i].number);
    dataLabels.push(pollInfo[i].VOTE);
  }

  const data = {
    labels: dataLabels,
    datasets: [
      {
        label: '',
        data: dataValues,
        backgroundColor:
          [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ]
      }
    ]
  };

  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };

  const gohome = () => {
    navigate("/home");
  };

  return (
    <div>

      <div style={
        {
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          fontSize: "30px",
        }
      }>{location.state.pollTitle}</div>


      <div style={{
        width: "700px",
        height: "400px",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
      }}>

        <Pie options={config} data={data} > </Pie>
      </div>

      <div style={ {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      } }>
        

          <CSVLink color='#FFFFFFF' data={pollInfo} headers={headers} filename={"votes.csv"}>
            <Button>
              Download {location.state.pollTitle} Results
            </Button>
            </CSVLink>
      </div>

      <div style={ {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        margin: "30px",
        width: "match_sibling",
      } }>
        <Button onClick={ gohome }>
          Go Back to Home
        </Button>
      </div>
    </div>
  )
}
/*

*/
export default Charter;






