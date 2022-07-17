import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import ClockComponent from "../../components/fiturSoalHarian/ClockComponent";

export default function TryoutPage() {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();
  const [clicked, setClicked] = useState(false);

  let interval;
  // useEffect(() => {
  // }, [])

  const startTimer = () => {
    let finish;
    finish = new Date();
    const today = new Date();
    finish.setDate(today.getDate());
    // finish.setHours(today.getHours() + 2);
    // finish.setMinutes(today.getMinutes() + 30);
    finish.setSeconds(today.getSeconds() + 10);
    console.log(finish, `ini expektasi finish`);

    setAfter(finish);
    // console.log(after, ` dimasukkan ke state`);

    const countDownDate = new Date(after).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setClicked(true);
    startTimer();
  };

  if (!clicked) {
    return (
      <>
        <Container>
          ini tryout page Awal
          <Button variant="primary" onClick={(e) => handleClick(e)}>
            Primary
          </Button>
        </Container>
      </>
    );
  }

  if (clicked) {
    return (
      <>
        <Container>
          ini tryout page Soal
          <ClockComponent
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
          />
        </Container>
      </>
    );
  }
}
