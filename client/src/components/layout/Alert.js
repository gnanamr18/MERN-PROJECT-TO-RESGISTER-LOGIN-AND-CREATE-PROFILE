import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAlert, removeAlert } from "../../reducers/alertSlice";
const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.errorMsg === true) {
      console.log("hi");
      dispatch(addAlert("user already exist"));
    }
  }, [state.errorMsg]);

  useEffect(() => {
    if (alerts.length > 0) {
      alerts.map((alert) => {
        setTimeout(() => {
          dispatch(removeAlert(alert.id));
          console.log(alert.id);
        }, 3000);
      });
    }
  }, [alerts, dispatch]);

  if (alerts.length > 0) {
    return (
      <div>
        {alerts.map((alert) => (
          <div className="alert-danger" key={alert.id}>
            {alert.text}
          </div>
        ))}
      </div>
    );
  }
};

export default Alert;
