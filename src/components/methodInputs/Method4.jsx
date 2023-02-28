import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { vMagData, voltageMagColumns, voltageMagRows } from '../../voltagemagdata';
import Chart from '../chart/Chart';
import Datatable from '../datatable/Datatable';
// import { method1calc } from '../methodCalc/method1Calc';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';


function Method4() {

    let cur_id = window.location.pathname.split("/")[1]

    const [alpha, setAlpha] = useState(0)
    // const [gamma, setGamma] = useState(0)
    const [CYLabel1, setChartYLabel1] = useState([])
    const [CYLabel2, setChartYLabel2] = useState([])
    const [Dtitle, setDTitle] = useState("")
    const [Dcols, setDCols] = useState([])
    const [Drows, setDRows] = useState([])

    const processData = async (e) => {
        e.preventDefault()

        console.log(alpha, cur_id)

        let url_loc = window.location.pathname.split("/")[2]
        // console.log(url_loc);
        let cur_key = '', title = ''
        let rows = [], cols = []
        // let chartRows = [], chartCols = []

        if (url_loc === "voltageMagData") {
            cur_key = 'Volmag'
            title = 'Voltage Magnitude'
        }
        if (url_loc === "voltageAngData") {
            cur_key = 'Volang'
            title = 'Voltage Angle'
        }
        if (url_loc === "powerActData") {
            cur_key = 'P'
            title = 'Active Power'
        }
        if (url_loc === "powerReactData") {
            cur_key = 'Q'
            title = 'Reactive Power'
        }

        // Double_Exponential_Smoothing_Browns_One_Parameter_Method
        title = "Single Exponential Smoothing Method - " + title

        axios.get(`http://localhost:5000/api/loadfc/${cur_id}`)
            .then((response) => {
                console.log(response.data);

                response.data.sort(function (a, b) {
                    return a.Slno - b.Slno;
                });

                let slno = [], x = []

                response.data.forEach((obj) => {
                    // x2.push([obj[cur_key], obj['Slno']])
                    x.push(obj[cur_key])
                    // console.log(cur_key);
                    slno.push(obj['Slno'])
                })

                console.log("X (M4): ", x);
                console.log(slno);

                let n = x.length;

                // C++ Fn here
                // Single_Exponential_Smoothing_Method

                let Ft = [];

                Ft.push(0);// Output 1st value error fix
                for (let i = 1; i <= n; i++) {
                    let s1;
                    if ((i - 1) <= 0) {
                        s1 = x[i - 1];
                    }
                    else {
                        s1 = alpha * x[i - 1] + (1 - alpha) * Ft[i - 1];
                    }
                    Ft.push(s1);
                }

                cols = [
                    { field: 'id', headerName: "Serial No.", width: 130 },
                    {
                        field: `${cur_key}`,
                        headerName: "Original Data",
                        width: 290,
                    },
                    {
                        field: 'Ft',
                        headerName: "Forecasted Data",
                        width: 290,
                    },
                ];

                for (let i = 0; i < n; i++) {
                    let obj = {
                        id: slno[i],
                        [cur_key]: x[i],
                        Ft: Ft[i],
                    }
                    // let chart_obj1={
                    //     id: slno[i],
                    // }

                    rows.push(obj)
                }

                console.log("Cols", cols);

                console.log("Rows", rows);

                setDTitle(title)
                setDCols(cols)
                setDRows(rows)
                setChartYLabel1(`${cur_key}`)
                setChartYLabel2('Ft')

            })
            .catch((error) => {
                console.log(error);
            })

        // console.log("Title",title);

    } //processData

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div class="formM">
                    <form onSubmit={processData}>
                        {/* <label>Alpha:</label>
                        <input type="text" value={alpha} onChange={e => setAlpha((e.target.value>1)? 1: e.target.value)} name='alpha' placeholder='Enter value of alpha'></input> */}
                        
                        <TextField id="standard-basic" label="Alpha" variant="standard" name="alpha" value={alpha} onChange={e => setAlpha((e.target.value>1)? 1: e.target.value)} />
                        <br /><br />
                        
                        <button type="submit" className="btnM">Submit</button>
                    </form>
                </div>
                <Datatable title={Dtitle} userColumns={Dcols} userRows={Drows} />
                <br /> <br />
                <Chart data={Drows} title={`${Dtitle} v/s Sl No.`} aspect={2 / 1} yLabel1={CYLabel1} yLabel2={CYLabel2} xLabel={'id'} />
            </div>
        </div>
    );
};

export default Method4;

