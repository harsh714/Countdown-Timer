import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={classes.values}>
      <span className={classes.text}>{props.text}</span>
      <input
        className={classes.field}
        type="number"
        value={props.value}
        onChange={props.onChange}
      ></input>
    </div>
  );
}
