import ListCard from "./ListCard";

export default function CardComponent({ number, babName, listSub }) {
  const subList = listSub.filter((x) => x.Task.Chapter.name == babName);

  const idComp = `accordionExample${number}`;
  const idHead = `heading${number}`;
  const idColl = `collapse${number}`;
  const hashColl = `#collapse${number}`;
  return (
    <>
      <div className="accordion" id={idComp}>
        <div className="accordion-item">
          <h2 className="accordion-header" id={idHead}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={hashColl}
              aria-expanded="true"
              aria-controls={idColl}
            >
              <p className="ini-bootstrap">{babName}</p>
            </button>
          </h2>
          <div
            id={idColl}
            className="accordion-collapse collapse"
            aria-labelledby={idHead}
            data-bs-parent={idComp}
          >
            <div className="accordion-body">
              {subList.map((x) => {
                return <ListCard listOf={x} key={x.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
