import ListCard from "./ListCard"

export default function CardComponent({ number, babName, listSub }) {
    const subList = listSub.filter(x => x.bab === babName)
    const idComp = `accordionExample${number}`
    const idHead = `heading${number}`
    const idColl = `collapse${number}`
    const hashColl = `#collapse${number}`
    return (
        <>
            <div class="accordion" id={idComp}>
                <div class="accordion-item">
                    <h2 class="accordion-header" id={idHead}>
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={hashColl} aria-expanded="true" aria-controls={idColl}>
                            {babName}
                        </button>
                    </h2>
                    <div id={idColl} class="accordion-collapse collapse" aria-labelledby={idHead} data-bs-parent={idComp}>
                        <div class="accordion-body">
                            {
                                subList.map(x => {
                                    return <ListCard listOf={x.description} key={x.id} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}