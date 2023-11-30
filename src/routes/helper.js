import SignUpPage from "../pages/onBoarding/signup/index";
import LoginPage from "../pages/onBoarding/login/index";
import ChatPage from "../pages/chat/chat";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setUser } from "../redux/slice/user.slice";
import { getUserDataApi } from "../apis/user";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user_data);
  const token = Cookies.get("token");

  useEffect(() => {
    let auth = token ? token : null;
    if (!token) {
      if (
        window.location.pathname != "/login" &&
        window.location.pathname != "/signup"
      ) {
        window.location.href = "/login";
      }
    }
    if (auth && !user) {
      let success = (response) => {
        dispatch(setUser(response?.data?.data?.user));
        Cookies.set("token", response?.data?.data?.token);
        Cookies.set("userId", response?.data?.data?.user?.id);
      };
      let fail = (response) => {
        toast.error(response?.data?.message);
        if (window.location.pathname != "/login") {
          window.location.href = "/login";
        }
      };
      dispatch(getUserDataApi(token, success, fail));
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
    path: "/chat",
    element: <ChatPage />,
  },
];
