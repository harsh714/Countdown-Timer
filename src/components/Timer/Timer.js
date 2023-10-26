import React, { useState, useRef } from "react";
import classes from "./Timer.module.css";
import Input from "../Input/Input";

export default function Timer() {
  const initialVal = 0;

  const [seconds, setSeconds] = useState(initialVal);
  const [minutes, setMinutes] = useState(initialVal);
  const [hours, setHours] = useState(initialVal);
  const [days, setDays] = useState(initialVal);
  const timerRef = useRef();

  const [isRunning, setIsRunning] = useState(false);

  let totalSeconds =
    days * 24 * 3600 + hours * 3600 + minutes * 60 + parseInt(seconds);

  const onoffHandler = () => {
    setIsRunning(true);

    timerRef.current = setInterval(() => {
      if (totalSeconds === 0) {
        clearInterval(timerRef.current);
        setIsRunning(false);
      } else {
        setDays(Math.floor(totalSeconds / 86400));
        setHours(Math.floor((totalSeconds % 86400) / 3600));
        setMinutes(Math.floor((totalSeconds % 3600) / 60));
        setSeconds(totalSeconds % 60);
        totalSeconds -= 1;
      }
    }, 1000);
  };

  function pauseHandler() {
    clearInterval(timerRef.current);
    setIsRunning((isRunning) => !isRunning);
  }

  function resetHandler() {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setHours(initialVal);
    setMinutes(initialVal);
    setSeconds(initialVal);
    setDays(initialVal);
  }

  const secondChangeHandler = (event) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSeconds(event.target.value);
  };

  const minuteChangeHandler = (event) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setMinutes(event.target.value);
  };

  const hourChangeHandler = (event) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setHours(event.target.value);
  };

  const dayChangeHandler = (event) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setDays(event.target.value);
  };
  return (
    <>
      <h2>Set Countdown</h2>
      <div className={classes.container}>
        <div className={classes.timer}>
          <Input text="days" value={days} onChange={dayChangeHandler} />

          <Input text="hours" value={hours} onChange={hourChangeHandler} />

          <Input
            text="minutes"
            value={minutes}
            onChange={minuteChangeHandler}
          />

          <Input
            text="seconds"
            value={seconds}
            onChange={secondChangeHandler}
          />
        </div>

        <div className="btn-container">
          <button onClick={onoffHandler}>Start</button>
          <button onClick={pauseHandler}>Pause</button>
          <button onClick={resetHandler}>Reset</button>
        </div>
      </div>
    </>
  );
}
