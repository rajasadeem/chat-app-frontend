import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/slice/user.slice";
import { loginApi } from "../../../apis/user";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import useValidation from "../../../hooks/useValidation";

const initialState = {
  email: "",
  password: "",
};
const useLogin = () => {
  const [loginData, setLoginData] = useState(initialState);

  const { emailValidation, passwordValidation, errors } = useValidation();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let disbledValidation =
    Object.values(loginData).every((x) => x !== "") &&
    Object.values(errors).every((x) => x === "")
      ? false
      : true;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        emailValidation(e);
        setLoginData({
          ...loginData,
          [name]: value,
        });
        break;
      case "password":
        passwordValidation(e);
        setLoginData({
          ...loginData,
          [name]: value,
        });
        break;
      default:
        setLoginData({
          ...loginData,
        });
    }
  };
  const onSubmit = () => {
    let success = (response) => {
      setLoading(false);
      dispatch(setUser(response?.data?.data?.user));
      toast.success(response?.data?.message);
      Cookies.set("token", response?.data?.data?.token);
      Cookies.set("userId", response?.data?.data?.user?.id);
      navigate("/chat");
    };
    let fail = (response) => {
      setLoading(false);
      toast.error(response?.data?.message);
    };
    setLoading(true);
    dispatch(loginApi(loginData, success, fail));
  };

  const navigateToSignUp = () => navigate("/signup");

  return {
    onChangeHandler,
    onSubmit,
    loading,
    errors,
    disbledValidation,
    loginData,
    navigateToSignUp,
  };
};

export default useLogin;
