import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useValidation from "../../../hooks/useValidation";
import { signupApi } from "../../../apis/user";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const useSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupData, setSignupData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { nameValidation, emailValidation, passwordValidation, errors } =
    useValidation();

  let disbledValidation =
    Object.values(signupData).every((x) => x !== "") &&
    Object.values(errors).every((x) => x === "")
      ? false
      : true;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        nameValidation(e);
        setSignupData({
          ...signupData,
          [name]: value,
        });
        break;
      case "email":
        emailValidation(e);
        setSignupData({
          ...signupData,
          [name]: value,
        });
        break;
      case "password":
        passwordValidation(e);
        setSignupData({
          ...signupData,
          [name]: value,
        });
        break;
      default:
        setSignupData({
          ...signupData,
          [name]: value,
        });
    }
  };

  const onSubmit = () => {
    setLoading(true);
    let success = (response) => {
      setLoading(false);
      toast.success(response?.data?.message);
      navigate("/login");
    };
    let fail = (response) => {
      setLoading(false);
      toast.error(response?.data?.message);
    };
    dispatch(signupApi(signupData, success, fail));
  };

  const navigateToLogin = () => navigate("/login");

  return {
    onChangeHandler,
    onSubmit,
    errors,
    disbledValidation,
    signupData,
    loading,
    navigateToLogin,
  };
};

export default useSignUp;
