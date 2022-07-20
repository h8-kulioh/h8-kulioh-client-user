import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import CardComponent from "../../components/fiturToDoList/CardComponent";
import Navbar from "../../components/ReusableComponents/Navbar";
import "../../css/UserTask.css";
import loading from "../../assets/loading2.gif";

export default function UserTask() {
  const [bab, setBab] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const isChange = useSelector((store) => store.toDoReducer.isChange);

  // console.log(isChange);
  let { subject } = useParams();
  subject = subject.toUpperCase();
  const getBab = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/chaptersroute/chapters`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      // console.log(response.data, `---------`);
      const subjectTask = response.data.filter((el) => el.subject === subject);
      // console.log(subjectTask);
      setBab(subjectTask);
      // setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/todoroute/todos`,
        {
          headers: {
            access_token: localStorage.getItem("accessToken"),
          },
        }
      );
      // console.log(response.data);
      const dataFilter = response.data.filter(
        (el) => el.Task.Chapter.subject === subject
      );
      setTasks(dataFilter);
      // console.log(dataFilter);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBab();
    getTasks();
    // console.log("here");
  }, [isChange]);

  const longName = (name) => {
    if (name === `PK`) {
      return `Pengetahuan Kuantitatif`;
    } else if (name === `PBM`) {
      return `Pemahaman Bacaan dan Menulis`;
    } else if (name === `PPU`) {
      return `Pengetahuan dan Pemahaman Umum`;
    } else if (name === `PU`) {
      return `Penalaran Umum`;
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        {!loading ? (
          <div className="outer-todo-list">
            <h2 className="pelajaran">{longName(subject)}</h2>
            <div className="card-component-container">
              {bab.map((x, idx) => {
                return (
                  <CardComponent
                    key={x.id}
                    idx={idx}
                    babName={x.name}
                    listSub={tasks}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <img src={loading} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
