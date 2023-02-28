import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../currentdata";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = ({ title, userRows, userColumns }) => {
  const [data, setData] = useState(userRows);
  useEffect(() => {

      setData(userRows)
      console.log("In DataTable UseEffect", userRows);

  },[userRows])
  // console.log("In DataTable", userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        // columns={userColumns.concat(actionColumn)}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
      // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
