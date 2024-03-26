import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="search"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="sign-in" element={"/"} />
      </Routes>
    </Router>
  );
};

export default App;
