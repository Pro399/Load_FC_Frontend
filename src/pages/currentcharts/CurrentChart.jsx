import React from 'react'
import Chart from '../../components/chart/Chart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { currentchartdata, yLabel } from '../../currentchartdata'
import '../home/home.scss'

const CurrentChart = () => {
  return (
      <>
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          <Chart data = {currentchartdata} title="Peak Current v/s Day of Week" aspect={2 / 1} yLabel={yLabel}/>
          {/* Add New Charts inside div for better alignment */}
        </div>
      </div>
    </div>
    </>
  )
}

export default CurrentChart
