import OurService from "./OurService";
import HomePage from "../pages/HomePage";
import NavBar from "../components/NavBar";
import Functionality from "./Functionality";
import Plans from "./Plans";
import MyApp from "./MyApp";
import Contact from "./Contact";

const AllPages = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <NavBar />

      <section id="home" style={{ width: "100%", minHeight: "100vh" }}>
        <HomePage />
      </section>

      <section id="ourservice" style={{ width: "100%", minHeight: "100vh" }}>
        <OurService />
      </section>

      <section id="myapp" style={{ width: "100%", minHeight: "100vh" }}>
        <MyApp />
      </section>

      <section id="functionality" style={{ width: "100%", minHeight: "100vh" }}>
        <Functionality />
      </section>

      <section id="plans" style={{ width: "100%", minHeight: "100vh" }}>
        <Plans />
      </section>

      <section id="contact" style={{ width: "100%", minHeight: "100vh" }}>
        <Contact />
      </section>
    </div>
  );
};

export default AllPages;
