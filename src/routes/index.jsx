import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth, { privateRoutes, publicRoutes } from "./helper";

const MainRouter = () => {
  const { token } = useAuth();
  return (
    <div>
      <Router>
        <Routes>
          {publicRoutes?.map(({ path, element }, index) => (
            <Route path={path} element={element} key={index} />
          ))}
          {token &&
            privateRoutes?.map(({ path, element }, index) => (
              <Route path={path} element={element} key={index} />
            ))}
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainRouter;
