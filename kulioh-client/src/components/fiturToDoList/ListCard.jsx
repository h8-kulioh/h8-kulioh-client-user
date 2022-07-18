import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actionType from "../../store/actions/actionType";

export default function ListCard({ listOf }) {
  // console.log(listOf, `--------`);

  let dispatch = useDispatch();
  const handleChange = (e) => {
    // console.log("change!");
    dispatch({
      type: actionType.TODO_UPDATE,
    });
  };

  const handleClick = async (e, id, status) => {
    e.preventDefault();
    try {
      console.log("here");
      if (status === false) {
        console.log("here false", id);
        const response = await axios.patch(
          `http://localhost:3001/todoroute/todos/${id}`,
          {
            status: true,
          },
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        // console.log("here in bottom");
        handleChange()
        console.log(response);
      } else if (status === true) {
        // console.log("here t");
        const response = await axios.patch(
          `http://localhost:3001/todoroute/todos/${id}`,
          {
            status: false,
          },
          {
            headers: {
              access_token: localStorage.getItem("accessToken"),
            },
          }
        );
        handleChange()
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
    // console.log(id, `id`);
  };
  return (
    <div className="card-body">
      <div className="form-check">
        <input
          onClick={(e) => handleClick(e, listOf.Task.id, listOf.status)}
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          checked={listOf.status === true}
          onChange={(e) => handleChange(e)}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {listOf.Task.description}
        </label>
      </div>
    </div>
  );
}
