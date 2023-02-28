import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { vMagData, voltageMagColumns, voltageMagRows } from '../../voltagemagdata';
import Chart from '../chart/Chart';
import Datatable from '../datatable/Datatable';
// import { method1calc } from '../methodCalc/method1Calc';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';


function Method2() {

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
        title = "Double Exponential Smoothing Browns One Parameter Method - " + title

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

                console.log("X (M2): ", x);
                console.log(slno);

                let n = x.length;

                // C++ Fn here
                // Double_Exponential_Smoothing_Browns_One_Parameter_Method

                let smooth1 = [], smooth2 = [], ai = [], bi = [], Ft = [];

                // First Smoothing
                for (let i = 1; i <= n; i++) {
                    let s1;
                    if (i - 1 <= 0)
                        s1 = x[i - 1];
                    else {
                        s1 = alpha * x[i - 1] + (1 - alpha) * smooth1[i - 2];
                        // cout << smooth1[i - 2] << " " << alphax1 << " " << smo1 << endl;
                    }
                    // cout << s1 << endl;
                    smooth1.push(s1);
                }

                // Second Smoothing
                for (let i = 1; i <= n; i++) {
                    let s2;
                    if (i - 1 <= 0)
                        s2 = x[i - 1];
                    else {
                        s2 = alpha * smooth1[i - 1] + (1 - alpha) * smooth2[i - 2];
                        // cout << smooth2[i - 2] << " " << alphax2 << " " << smo2 << endl;
                    }
                    // cout << s2 << endl;
                    smooth2.push(s2);
                }

                let m = 1; // Forecast Period(Update params in future?)
                Ft.push(0); // Output 1st value error fix
                for (let i = 1; i <= n; i++) {
                    let calcA = 2 * smooth1[i - 1] - smooth2[i - 1];
                    if (i <= 1)
                        calcA = 0; // Output 1st value error fix
                    ai.push(calcA);
                    let calcB = (smooth1[i - 1] - smooth2[i - 1]) * alpha / (1 - alpha);
                    bi.push(calcB);
                    let calcFt = ai[i - 1] + bi[i - 1] * m; // Forecast Period(m) fix
                    if (i <= m)
                        calcFt = 0; // Output 2nd value error fix(for m)
                    Ft.push(calcFt);
                }

                cols = [
                    { field: 'id', headerName: "Serial No.", width: 130 },
                    {
                        field: `${cur_key}`,
                        headerName: "Original Data",
                        width: 290,
                    },
                    {
                        field: 'smooth1',
                        headerName: "Single Exponential Smoothing",
                        width: 290,
                    },
                    {
                        field: 'smooth2',
                        headerName: "Double Exponential Smoothing",
                        width: 290,
                    },
                    {
                        field: 'ai',
                        headerName: "Value of a",
                        width: 290,
                    },
                    {
                        field: 'bi',
                        headerName: "Value of b",
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
                        smooth1: smooth1[i],
                        smooth2: smooth2[i],
                        ai: ai[i],
                        bi: bi[i],
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
                        <input type="text" value={alpha} onChange={e => setAlpha((e.target.value>1)? 1: e.target.value )} name='alpha' placeholder='Enter value of alpha'></input> */}
                        
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

export default Method2;

