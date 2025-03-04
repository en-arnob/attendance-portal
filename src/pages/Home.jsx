import Layout from "../components/Layout";
import MenuGrid from "../components/MenuGrid";
import AttendanceStatus from "../components/AttendanceStatus";
import ImgBg from "../assets/image.svg";

const Home = () => {
  return (
    <Layout>
      <div>
        <AttendanceStatus />
        <MenuGrid />
      </div>
      {/* SVG at the bottom */}
      <div className="svg-container">
        <img src={ImgBg} />
      </div>
    </Layout>
  );
};

export default Home;
