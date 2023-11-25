import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removealert } from "../../reducers/alertSlice";
const Alert = () => {
  const alerts = useSelector((state) => state.alert.alerts);
  const auth = useSelector((state) => state.auth.error[0].msg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alerts !== null && alerts.length > 0) {
      alerts.forEach((alert) => {
        const timeoutId = setTimeout(() => {
          dispatch(removealert(alert.id));
        }, 2000);
        console.log(timeoutId);

        // Optionally, you can clear the timeout when the component unmounts or when the alert is manually removed
        return () => clearTimeout(timeoutId);
      });
    }
  }, [alerts]);

  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => (
      <div key={alert.id} className={`alert-danger`}>
        {alert.text}
      </div>
    ));
  }

  return null;
};

export default Alert;

// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { removealert } from "../../features/todo/reducerslice";

// const Alert = () => {
//   const alerts = useSelector(state => state.alerts);
//   const dispatch = useDispatch()

//   useEffect = ( () => { alerts.foreach((alert)=> alert.id)})

//   if (alerts !==null && alerts.length > 0) {
//     return (
//       alerts.map((alert) => (
//         <div key={alert.id} className={`alert-danger`}>
//           {alert.text}
//         </div>
//       ))
//     );
//   }

//   return null;
// };

// export default Alert;
