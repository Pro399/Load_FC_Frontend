import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { vMagData, voltageMagColumns, voltageMagRows } from '../../voltagemagdata';
import Chart from '../chart/Chart';
import Datatable from '../datatable/Datatable';
// import { method1calc } from '../methodCalc/method1Calc';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';


function Method5() {

    let cur_id = window.location.pathname.split("/")[1]

    const [beta, setBeta] = useState(0)
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

        console.log(beta, cur_id)

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

        // Single_Exponential_Smoothing_An_Adaptive_Approach_Method
        title = "Adaptive Single Exponential Smoothing Method - " + title + " - Bus " + window.location.pathname.split("/")[1]

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

                console.log("X (M5): ", x);
                console.log(slno);

                let n = x.length;

                // C++ Fn here
                // Single_Exponential_Smoothing_An_Adaptive_Approach_Method

                let E = [], M = [], e = [], alpha = [], Ft = [];

                // Initializations
                Ft.push(0);
                Ft.push(x[0]);
                e.push(x[0] - Ft[0]);
                E.push(0);
                M.push(0);
                alpha.push(0);

                let initI = 1; // >=1 // Update in params in  future ?
                for (let i = 0; i < initI; i++) {
                    alpha.push(beta);
                }

                for (let i = 1; i <= n; i++) {
                    if (i >= 2) {
                        let FtCalc = alpha[i - 1] * x[i - 1] + (1 - alpha[i - 1]) * Ft[i - 1];
                        Ft.push(FtCalc);
                    }

                    let eCalc = x[i] - Ft[i];
                    e.push(eCalc);
                    let ECalc = beta * e[i] + (1 - beta) * E[i - 1];
                    E.push(ECalc);
                    let MCalc = beta * Math.abs(e[i]) + (1 - beta) * M[i - 1];
                    M.push(MCalc);

                    if (i >= initI) // L:89
                    {
                        let alphaCalc = Math.abs(E[i] / M[i]);
                        alpha.push(alphaCalc);
                    }
                }

                cols = [
                    { field: 'id', headerName: "Serial No.", width: 130 },
                    {
                        field: `${cur_key}`,
                        headerName: "Original Data",
                        width: 290,
                    },
                    {
                        field: 'e',
                        headerName: "Error",
                        width: 290,
                    }, {
                        field: 'E',
                        headerName: "Smoothed Error",
                        width: 290,
                    }, {
                        field: 'M',
                        headerName: "Absolute Smoothed Error",
                        width: 290,
                    }, {
                        field: 'alpha',
                        headerName: "Alpha(t) value",
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
                        e: e[i],
                        E: E[i],
                        M: M[i],
                        alpha: alpha[i],
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
                <div class="formM">
                    <form onSubmit={processData}>
                        {/* <label>Beta:</label>
                        <input type="text" value={beta} onChange={e => setBeta( (e.target.value>1)? 1: e.target.value ) } name='beta' placeholder='Enter value of beta'></input> */}
                        <TextField id="standard-basic" label="Beta" variant="standard" name="beta" value={beta} onChange={e => setBeta((e.target.value > 1) ? 1 : e.target.value)} />

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

export default Method5;

