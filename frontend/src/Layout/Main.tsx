import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <div>
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
