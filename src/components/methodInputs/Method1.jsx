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


function Method1() {

    let cur_sys = window.location.pathname.split("/")[1]
    let cur_id = window.location.pathname.split("/")[2]

    const [alpha, setAlpha] = useState(0)
    const [gamma, setGamma] = useState(0)

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

        console.log(alpha, gamma, cur_id)

        let url_loc = window.location.pathname.split("/")[3]
        // console.log("Method 1 : "+url_loc);

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

        // Double_Exponential_Smoothing_Holts_Two_Parameter_Method
        title = "Double Exponential Smoothing Holts Two Parameter Method - " + title + ` - Bus ${cur_id} (${cur_sys})`

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

                // x2 = x2.sort(function (a, b) {
                //     return a[1] - b[1]
                // })

                // console.log("X2 : ",x2);

                // for(let i=0;i<x2.length;i++){
                //     x.push(x2[i][0])
                // }

                console.log("X (M1): ", x);
                console.log(slno);

                let n = x.length;
                // Double_Exponential_Smoothing_Holts_Two_Parameter_Method

                let smooth1 = [], bi = [], Ft = []

                for (let i = 1; i <= n; i++) {
                    let s1 = 0, calcB = 0;
                    if ((i - 1) <= 0) {
                        s1 = x[i - 1];
                        calcB = x[1] - x[0];
                    }
                    else {
                        s1 = alpha * x[i - 1] + (1 - alpha) * (smooth1[i - 2] + bi[i - 2]);
                        calcB = gamma * (s1 - smooth1[i - 2]) + (1 - gamma) * bi[i - 2];
                        // cout<<fixed<<setprecision(3) << smooth1[i - 2] << " " << s1 << " " << bi[i - 2] << endl;
                    }
                    // cout << s1 << endl;
                    // smooth1[i-1] = s1;
                    smooth1.push(s1)
                    // console.log(`Smooth1 ${i}`, smooth1[i]);
                    // bi[i-1] = calcB;
                    bi.push(calcB)
                    // console.log(`bi ${i}`, bi[i]);
                }

                let m = 1; // Forecast Period(update params in future?)
                Ft.push(0); // Output 1st value fix
                for (let i = 1; i <= n; i++) {
                    let calcFt = smooth1[i - 1] + bi[i - 1] * m;//Forecast period(m) fix
                    // Ft[i - 1] = calcFt;
                    if (i <= m)
                        calcFt = 0; // Output 2nd value fix(for m)
                    Ft.push(calcFt)
                    // console.log(`Ft ${i - 1}`, Ft[i]);
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
                        headerName: "Smoothing of data",
                        width: 290,
                    },
                    {
                        field: 'bi',
                        headerName: "Smoothing of trend",
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
                        bi: bi[i],
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
                        <input type="text" value={alpha} onChange={e => setAlpha((e.target.value>1)? 1: e.target.value)} name='alpha' placeholder='Enter value of alpha'></input> */}
                        <TextField id="standard-basic" label="Alpha" variant="standard" name="alpha" value={alpha} onChange={e => setAlpha((e.target.value > 1) ? 1 : e.target.value)} />
                        <br /><br />
                        {/* <label>Gamma:</label>
                        <input type="text" value={gamma} onChange={e => setGamma((e.target.value>1)? 1: e.target.value)} name='gamma' placeholder='Enter value of gamma'></input> */}
                        <TextField id="standard-basic" label="Gamma" variant="standard" name="gamma" value={gamma} onChange={e => setGamma((e.target.value > 1) ? 1 : e.target.value)} />
                        <br />
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

export default Method1;

