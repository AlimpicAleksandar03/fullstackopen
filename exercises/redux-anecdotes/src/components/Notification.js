import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return !notification ? null : (
    <div style={style}>
      {notification}
      {setTimeout(() => {
        dispatch(clearMessage());
      }, 2000)}
    </div>
  );
};

export default Notification;
