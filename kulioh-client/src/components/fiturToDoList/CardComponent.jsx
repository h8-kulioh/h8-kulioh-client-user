import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import "../../css/CardComponent.css";

export default function CardComponent({ idx, babName, listSub }) {
  const [isActive, setIsActive] = useState(false);
  const subList = listSub.filter((x) => x.Task.Chapter.name === babName);

  useEffect(() => {
    if (idx === 0) {
      setIsActive(true);
    }
  }, [idx]);

  return (
    <div className="accordion-container">
      <div className="accordion">
        <div className="accordion-item">
          <div
            onClick={() => setIsActive(!isActive)}
            className={`accordion-title ${isActive ? "active" : null}`}
          >
            <div>{babName}</div>
            <div className="icon-accordion">{isActive ? "▲" : "▼"}</div>
          </div>
          {isActive && (
            <div className="accordion-content">
              {subList.map((x) => {
                return <ListCard listOf={x} key={x.id} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
