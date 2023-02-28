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
        Dashboard
        {/* <div className="widgets">
          <Widget type="current" />
          <Widget type="voltage" />
          <Widget type="power" /> */}
          {/* <Widget type="balance" /> */}
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        {/* <div className="listContainer">
          <div className="listTitle">Summary</div> */}
          {/* <Table /> */}
          {/* <Datatable title = {hData} userColumns = {homeColumns} userRows = {homeRows}/>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Home;
