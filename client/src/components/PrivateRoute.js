import { redirect, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        localStorage.getItem("authToken") ? (
          <Element {...props} />
        ) : (
          redirect("/signin")
        );
      }}
    />
  );
};

export default PrivateRoute;
