import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Datatable from "../../components/datatable/Datatable";
import { hData, homeColumns, homeRows } from "../../homedata";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets-new">
          <div className="left-new">
            {/* <span className="title">title</span> */}
            <span className="method">
              Method 1
            </span>
          </div>
          <div className="right-new">
            <span className="method-name">
              Double Exponential Smoothing Holts Two Parameter Method
            </span>
          </div>
        </div>
        <div className="widgets-new">
          <div className="left-new">
            {/* <span className="title">title</span> */}
            <span className="method">
              Method 2
            </span>
          </div>
          <div className="right-new">
            <span className="method-name">
              Double Exponential Smoothing Browns One Parameter Method
            </span>
          </div>
        </div>
        <div className="widgets-new">
          <div className="left-new">
            {/* <span className="title">title</span> */}
            <span className="method">
              Method 3
            </span>
          </div>
          <div className="right-new">
            <span className="method-name">
              Triple Exponential Smoothing Browns One Parameter Quadratic Method
            </span>
          </div>
        </div>
        <div className="widgets-new">
          <div className="left-new">
            {/* <span className="title">title</span> */}
            <span className="method">
              Method 4
            </span>
          </div>
          <div className="right-new">
            <span className="method-name">
              Single Exponential Smoothing Method
            </span>
          </div>
        </div>
        <div className="widgets-new">
          <div className="left-new">
            {/* <span className="title">title</span> */}
            <span className="method">
              Method 5
            </span>
          </div>
          <div className="right-new">
            <span className="method-name">
              Adaptive Single Exponential Smoothing Method
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
