import React from 'react'
import Chart from '../../components/chart/Chart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { powerchartdata, yLabel } from '../../powerchartdata'
import '../home/home.scss'

const PowerChart = () => {
  return (
      <>
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Chart data = {powerchartdata} title="Peak Power Consumed v/s Day of Week" aspect={2 / 1} yLabel={yLabel}/>
          {/* Add New Charts inside div for better alignment */}
        </div>
      </div>
    </div>
    </>
  )
}

export default PowerChart
