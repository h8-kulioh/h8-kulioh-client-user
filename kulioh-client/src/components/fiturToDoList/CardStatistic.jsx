// import PercentageCircle from 'reactjs-percentage-circle';

export default function CardStatistic() {
    return (
        <div className='card-map' style={{ border: '1px solid black', marginRight: '5vw' }}>
            <p>Matematika</p>
            <div className='row'>
                <div className='col-md-6'>
                    <svg width="200" height="200">
                        <g transform="rotate(-90 100 100)">
                            <circle r="70" cx="100" cy="100" fill="transparent" stroke="lightgrey" stroke-width="2rem" stroke-dasharray="439.8" stroke-dashoffset="0"></circle>
                            <circle r="70" cx="100" cy="100" fill="transparent" stroke="blue" stroke-width="2rem" stroke-dasharray="339.8" stroke-dashoffset="66">
                            </circle>
                        </g>
                        <text x="50%" y="50%" style={{ fontWeight: 500, fontSize: 30 }} dominant-baseline="central" text-anchor="middle">85%</text>
                    </svg>
                    {/* <PercentageCircle percent={80}></PercentageCircle> */}

                </div>
                <div className='col-md-6'>
                    <p>Total Task: 20</p>
                    <p>Total Done: 17</p>
                    <p>Notes</p>
                </div>
            </div>
        </div>
    )
}