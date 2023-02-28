import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
// import { userColumns, userRows } from "../../currentdata";
// import { userColumn, userRow } from "../../voltagedata";

const List = ({data, userColumns, userRows}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable title = {data} userColumns = {userColumns} userRows = {userRows}/>
        {/* <Datatable userColumns = {userColumn} userRows = {userRow}/> */}
      </div>
    </div>
  )
}

export default List