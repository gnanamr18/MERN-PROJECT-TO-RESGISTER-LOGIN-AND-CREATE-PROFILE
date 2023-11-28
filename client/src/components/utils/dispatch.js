import React from "react";
import { useDispatch, useSelector } from "react-redux";
import addAlert from "../../reducers/alertSlice";

const dispatch = () => {
  const state = useSelector((state) => {
    state.auth.errorMsg;
  });
  const dispatch = useDispatch();
  const showAlert = (text) => {
    dispatch(addAlert({ text }));
  };
  return { showAlert };
};

export default dispatch;
