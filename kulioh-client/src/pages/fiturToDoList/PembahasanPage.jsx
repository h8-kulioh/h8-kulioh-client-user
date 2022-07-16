// import { useState, useEffect } from "react";

// import { Container, Card, Button } from "react-bootstrap";
// import PropTypes from "prop-types"
// import ClockComponent from "../../components/fiturSoalHarian/ClockComponent";

// const YoutubeEmbed = ({ embedId }) => (
//     <div className="video-responsive">
//         <iframe
//             width="853"
//             height="480"
//             src={`https://www.youtube.com/embed/${embedId}`}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="Embedded youtube"
//         />
//     </div>
// );
// YoutubeEmbed.propTypes = {
//     embedId: PropTypes.string.isRequired
// };

// export default function PembahasanPage() {
//     const [member, setMember] = useState('biasa')
//     const [timerHours, setTimerHours] = useState()
//     const [timerMinutes, setTimerMinutes] = useState()
//     const [timerSeconds, setTimerSeconds] = useState()
//     const [after, setAfter] = useState()
//     let interval;
//     useEffect(() => {
//         let tomorrow;
//         tomorrow = new Date()
//         const today = new Date()
//         tomorrow.setDate(today.getDate() + 1)
//         tomorrow.setHours(5, 0, 0)
//         // console.log(today);
//         // console.log(tomorrow);
//         setAfter(tomorrow)
//     }, [])

//     const startTimer = () => {
//         // const tomorrow = new Date().getDate() + 1
//         console.log(after);
//         const countDownDate = new Date(after).getTime()
//         // const countDownDate = clock
//         interval = setInterval(() => {
//             const now = new Date().getTime()

//             const distance = countDownDate - now
//             // console.log(distance);
//             const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60))
//             const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
//             const seconds = Math.floor((distance % (60 * 1000)) / (1000))

//             if (distance < 0) {
//                 //timer stop
//                 //ketika component nya ga dipake, clear Interval
//                 //
//                 clearInterval(interval)
//             } else {
//                 setTimerHours(hours)
//                 setTimerMinutes(minutes)
//                 setTimerSeconds(seconds)
//             }
//         })

//     }

//     useEffect(() => {
//         if (after) {
//             startTimer()
//         }
//         return () => {
//             clearInterval(interval)
//             //nampilin soal
//         }
//     }, [after])

//     return (
//         <Container>
//             <div className="countdown-daily">
//                 <ClockComponent timerHours={timerHours} timerMinutes={timerMinutes} timerSeconds={timerSeconds} />
//             </div>
//             <div className="vid-pembahasan">
//                 <Card style={{ width: '40rem' }}>
//                     <YoutubeEmbed embedId="Wi43BklTW1U" />

//                     <Card.Body>
//                         <Card.Title>Card Title</Card.Title>
//                         <Card.Text>
//                             Some quick example text to build on the card title and make up the
//                             bulk of the card's content.
//                         </Card.Text>
//                         <Button variant="primary">Go somewhere</Button>
//                     </Card.Body>
//                 </Card>
//             </div>

//         </Container>
//     )
// }
