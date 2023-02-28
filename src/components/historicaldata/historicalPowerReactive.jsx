import "../../pages/list/list.scss"
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar"
import Datatable from "../datatable/Datatable"
import { pReactData, powerReactColumns, powerReactRows } from "../../powerreactivedata";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import { userColumn, userRow } from "../../voltagedata";




const PowerReactList = () => {
  const [rows, setRows] = useState([])
  let cur_id = window.location.pathname.split("/")[1]
  console.log(cur_id);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/loadfc/${cur_id}`)
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
  }, [cur_id])
  // console.log(cur_id);
  // console.log(window.location.pathname);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <Link to={`/${cur_id}/powerReactData/method1`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 1</button>
          </Link>
          <Link to={`/${cur_id}/powerReactData/method2`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 2</button>
          </Link>
          <Link to={`/${cur_id}/powerReactData/method3`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 3</button>
          </Link>
          <Link to={`/${cur_id}/powerReactData/method4`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 4</button>
          </Link>
          <Link to={`/${cur_id}/powerReactData/method5`} style={{ textDecoration: 'none', }}>
            <button className="btnM">Method 5</button>
          </Link>
        </div>
        <Datatable title={`Bus ${cur_id} - `+pReactData} userColumns={powerReactColumns} userRows={rows} />
        <br /><br />
        {/* <Datatable userColumns = {userColumn} userRows = {userRow}/> */}
      </div>
    </div>
  )
}

export default PowerReactList