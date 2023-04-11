import "./method.scss"
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { vMagData, voltageMagColumns, voltageMagRows } from '../../voltagemagdata';
import Chart from '../chart/Chart';
import Datatable from '../datatable/Datatable';
// import { method1calc } from '../methodCalc/method1Calc';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';


function Method3() {

    let cur_sys = window.location.pathname.split("/")[1]
    let cur_id = window.location.pathname.split("/")[2]

    const [alpha, setAlpha] = useState(0)
    // const [gamma, setGamma] = useState(0)
    const [CYLabel1, setChartYLabel1] = useState([])
    const [CYLabel2, setChartYLabel2] = useState([])
    const [CYLabel3, setChartYLabel3] = useState([])
    const [CYLabel4, setChartYLabel4] = useState([])

    const [Mse, setMse] = useState(0)

    const [Dtitle, setDTitle] = useState("")
    const [Dcols, setDCols] = useState([])
    const [Drows, setDRows] = useState([])

    const processData = async (e) => {
        e.preventDefault()

        console.log(alpha, cur_id)

        let url_loc = window.location.pathname.split("/")[3]
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

        // Triple_Exponential_Smoothing_Browns_One_Parameter_Quadratic_Method
        title = "Triple Exponential Smoothing Browns One Parameter Quadratic Method - " + title + ` - Bus ${cur_id} (${cur_sys})`

        axios.get(`http://localhost:5000/api/loadfc/${cur_sys}/${cur_id}`)
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

                console.log("X (M3): ", x);
                console.log(slno);

                let n = x.length;

                // C++ Fn here
                // Triple_Exponential_Smoothing_Browns_One_Parameter_Quadratic_Method

                let smooth1 = [], smooth2 = [], smooth3 = [], ai = [], bi = [], ci = [], Ft = [];

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

                // Third Smoothing
                for (let i = 1; i <= n; i++) {
                    let s3;
                    if (i - 1 <= 0)
                        s3 = x[i - 1];
                    else {
                        s3 = alpha * smooth2[i - 1] + (1 - alpha) * smooth3[i - 2];
                        // cout << smooth3[i - 2] << " " << alphax3 << " " << smo3 << endl;
                    }
                    // cout << s3 << endl;
                    smooth3.push(s3);
                }

                let m = 1; //Forecast period(Update params in future?)
                Ft.push(0); // Output 1st value error fix
                for (let i = 1; i <= n; i++) {
                    let calcA = 3 * smooth1[i - 1] - 3 * smooth2[i - 1] + smooth3[i - 1];
                    if (i <= 1)
                        calcA = 0; // Output 1st value error fix
                    ai.push(calcA);
                    let calcB = ((6 - 5 * alpha) * smooth1[i - 1] - (10 - 8 * alpha) * smooth2[i - 1] + (4 - 3 * alpha) * smooth3[i - 1]) * alpha / (2 * Math.pow((1 - alpha), 2));
                    if (i <= 1)
                        calcB = 0; // Output 1st value error fix
                    bi.push(calcB);
                    let calcC = (smooth1[i - 1] - 2 * smooth2[i - 1] + smooth3[i - 1]) * Math.pow(alpha, 2) / (Math.pow((1 - alpha), 2));
                    if (i <= 1)
                        calcC = 0; // Output 1st value error fix
                    ci.push(calcC);
                    let calcFt = ai[i - 1] + bi[i - 1] * m + ci[i - 1] * Math.pow(m, 2) / 2; // Forecast period(m) fix
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
                        headerName: "Single Smoothing",
                        width: 290,
                    },
                    {
                        field: 'smooth2',
                        headerName: "Double Smoothing",
                        width: 290,
                    },
                    {
                        field: 'smooth3',
                        headerName: "Triple Smoothing",
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
                        field: 'ci',
                        headerName: "Value of c",
                        width: 290,
                    },
                    {
                        field: 'Ft',
                        headerName: "Forecasted Data",
                        width: 290,
                    },
                    {
                        field: 'ae',
                        headerName: "Absolute Error",
                        width: 290,
                    },
                    {
                        field: 'se',
                        headerName: "Squared Error",
                        width: 290,
                    },
                ];

                let ssum = 0
                for (let i = 0; i < n; i++) {
                    let obj = {
                        id: slno[i],
                        [cur_key]: x[i],
                        smooth1: smooth1[i],
                        smooth2: smooth2[i],
                        smooth3: smooth3[i],
                        ai: ai[i],
                        bi: bi[i],
                        ci: ci[i],
                        Ft: Ft[i],
                        ae: Math.abs(x[i] - Ft[i]),
                        se: Math.pow((x[i] - Ft[i]), 2),
                    }

                    ssum += Math.pow((x[i] - Ft[i]), 2)

                    rows.push(obj)
                }

                console.log("Cols", cols);
                console.log("Rows", rows);

                let mse = ssum / n;

                setMse(mse)
                setDTitle(title)
                setDCols(cols)
                setDRows(rows)
                setChartYLabel1(`${cur_key}`)
                setChartYLabel2('Ft')
                setChartYLabel3('ae')
                setChartYLabel4('se')

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
                <div class="formContainer">
                    <form onSubmit={processData}>
                        {/* <label>Alpha:</label>
                        <input type="text" value={alpha} onChange={e => setAlpha(e.target.value)} name='alpha' placeholder='Enter value of alpha'></input> */}

                        <TextField id="standard-basic" label="Alpha" variant="standard" name="alpha" value={alpha} onChange={e => setAlpha((e.target.value > 1) ? 1 : e.target.value)} />
                        <br /><br />

                        <button type="submit" className="btnM">Submit</button>
                    </form>
                </div>
                <Datatable title={Dtitle} userColumns={Dcols} userRows={Drows} />
                <br /> <br />
                <Chart data={Drows} title={`${Dtitle} v/s Sl No.`} aspect={2 / 1} yLabel1={CYLabel1} yLabel2={CYLabel2} xLabel={'id'} />
                <br /> <br />
                <Chart data={Drows} title={`Absolute Error v/s Sl No.`} aspect={2 / 1} yLabel1={CYLabel3} xLabel={'id'} />
                <br /> <br />
                <Chart data={Drows} title={`Square Error v/s Sl No.`} footnote={`Mean Squared Error = ${Mse}`} aspect={2 / 1} yLabel2={CYLabel4} xLabel={'id'} />

            </div>
        </div>
    );
};

export default Method3;

