import "../../pages/list/list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import Datatable from "../datatable/Datatable"
import { vAngData, voltageAngColumns, voltageAngRows } from "../../voltageangdata.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// import { userColumn, userRow } from "../../voltagedata";


// console.log(cur_id);
// console.log(window.location.pathname);


const VoltageAngList = () => {
  const [rows, setRows] = useState([])
  let cur_id = window.location.pathname.split("/")[2]
  console.log(cur_id);
  let cur_sys = window.location.pathname.split("/")[1]
  console.log(cur_sys);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/loadfc/${cur_sys}/${cur_id}`)
      .then((response) => {
        console.log(response.data)

        response.data.forEach((obj) => {
          obj['id'] = obj['Slno'];

        })

        response.data.sort(function (a, b) {
          return a.id - b.id;
        })

        setRows(response.data)

      })
      .catch((error) => {
        console.log(error);
      })
  }, [cur_id,cur_sys])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <Link to={`/${cur_sys}/${cur_id}/voltageAngData/method1`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 1</button>
          </Link>
          <Link to={`/${cur_sys}/${cur_id}/voltageAngData/method2`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 2</button>
          </Link>
          <Link to={`/${cur_sys}/${cur_id}/voltageAngData/method3`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 3</button>
          </Link>
          <Link to={`/${cur_sys}/${cur_id}/voltageAngData/method4`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 4</button>
          </Link>
          <Link to={`/${cur_sys}/${cur_id}/voltageAngData/method5`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 5</button>
          </Link>
        </div>

        <Datatable title={`IEEE ${cur_sys} Bus System - Bus ${cur_id} - `+vAngData} userColumns={voltageAngColumns} userRows={rows} />
        <br /><br />
        {/* <Datatable userColumns = {userColumn} userRows = {userRow}/> */}

      </div>
    </div>
  )
}

export default VoltageAngList