import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import "./UserTask.css";

export default function UserTask() {
  const [bab, setBab] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBab = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/bab`);
      const matematika = response.data.filter(
        (el) => el.subject === `Matematika`
      );
      setBab(matematika);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks`);
      // console.log(response.data);
      const matematika = response.data.filter(
        (el) => el.subject === "Matematika"
      );
      setTasks(matematika);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const openSwal = (e) => {
    e.preventDefault();
    return Swal.fire({
      html:
        `<svg width="200" height="200">
            <g transform="rotate(-90 100 100)">
              <circle r="70" cx="100" cy="100" fill="transparent" stroke="lightgrey" stroke-width="2rem" stroke-dasharray="439.8" stroke-dashoffset="0"></circle>
              <circle r="70" cx="100" cy="100" fill="transparent" stroke="blue" stroke-width="2rem" stroke-dasharray="439.8" stroke-dashoffset="66"> 
              </circle>
            </g>
            <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"><p className="ini-bootstrap">85%</p></text>
          </svg> <br/>` +
        `<p className="ini-bootstrap">lengkapi pembelajaran untuk bekal SBMPTN <br/></p>` +
        `<a className="ini-bootstrap" href="">Lihat statistik lengkap</a>`,
    });
  };

  useEffect(() => {
    getBab();
    getTasks();
  }, []);

  if (loading) {
    return <h1>Please wait</h1>;
  }

  return (
    <>
      <Container className="mt-5 ini-bootstrap">
        <p>ini userTask Page</p>
        <p>Mata Pelajaran: Matematika</p>
        <Button onClick={(e) => openSwal(e)} variant="outline-primary">
          Statistik
        </Button>
        <div className="mt-5">
          {bab.map((x, num) => {
            return (
              <CardComponent
                key={x.id}
                number={num + 1}
                babName={x.name}
                listSub={tasks}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
