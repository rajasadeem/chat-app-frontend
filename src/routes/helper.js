import SignUpPage from "../pages/onBoarding/signup/index";
import LoginPage from "../pages/onBoarding/login/index";
import ChatPage from "../pages/home/index";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setUser } from "../redux/slice/user.slice";
import { getUserDataApi } from "../apis/user";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user?.user_data);
  const token = Cookies.get("token");

  const getUserData = () => {
    let success = (response) => {
      dispatch(setUser(response?.data?.data));
      Cookies.set("userId", response?.data?.data?._id);
    };
    let fail = (response) => {
      toast.error(response?.data?.message);
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    };
    dispatch(getUserDataApi("", token, success, fail));
  };

  useEffect(() => {
    console.log("UseEffect");
    if (!token) {
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate("/login");
      }
    } else {
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/home");
      }
      if (!user) {
        getUserData();
      }
    }
  }, []);

  return {
    token,
  };
};

export default useAuth;

export const publicRoutes = [
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];

export const privateRoutes = [
  {
    path: "/home",
    element: <ChatPage />,
  },
];
