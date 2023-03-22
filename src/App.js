
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import LandingPage from "./pages/landingpage/LandingPage";

import CurrentChart from "./pages/currentcharts/CurrentChart";
import VoltageChart from "./pages/voltagecharts/VoltageChart";
import PowerChart from "./pages/powercharts/PowerChart";

import Profile from "./pages/profile/Profile";

import VoltageMagList from "./components/historicaldata/historicalVoltageMag";
import VoltageAngList from "./components/historicaldata/historicalVoltageAng";
import PowerActList from "./components/historicaldata/historicalPowerActive";
import PowerReactList from "./components/historicaldata/historicalPowerReactive";

import Method1 from "./components/methodInputs/Method1";
import Method2 from "./components/methodInputs/Method2";
import Method3 from "./components/methodInputs/Method3";
import Method4 from "./components/methodInputs/Method4";
import Method5 from "./components/methodInputs/Method5";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  // console.log(process.env.DOMAIN);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="dashboard" element={<Home />} />
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />

            <Route path="21">
              <Route path="voltageMagData">
                <Route index element={<VoltageMagList />} component={VoltageMagList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>


              <Route path="voltageAngData">
                <Route index element={<VoltageAngList />} component={VoltageAngList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>
            </Route>

            <Route path="57">
              <Route path="voltageMagData">
                <Route index element={<VoltageMagList />} component={VoltageMagList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>


              <Route path="voltageAngData">
                <Route index element={<VoltageAngList />} component={VoltageAngList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>
            </Route>

            <Route path="97">
              <Route path="voltageMagData">
                <Route index element={<VoltageMagList />} component={VoltageMagList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>


              <Route path="voltageAngData">
                <Route index element={<VoltageAngList />} component={VoltageAngList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>
            </Route>

            <Route path="117">
              <Route path="voltageMagData">
                <Route index element={<VoltageMagList />} component={VoltageMagList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>


              <Route path="voltageAngData">
                <Route index element={<VoltageAngList />} component={VoltageAngList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />

              </Route>
            </Route>

            <Route path = "53">
              <Route path="powerActData">
                <Route index element={<PowerActList />} component={PowerActList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />


              </Route>

              <Route path="powerReactData">
                <Route index element={<PowerReactList />} component={PowerReactList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />


              </Route>
            </Route>

            <Route path = "106">
              <Route path="powerActData">
                <Route index element={<PowerActList />} component={PowerActList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />


              </Route>

              <Route path="powerReactData">
                <Route index element={<PowerReactList />} component={PowerReactList} />

                <Route path="method1" element={<Method1 />} />
                <Route path="method2" element={<Method2 />} />
                <Route path="method3" element={<Method3 />} />
                <Route path="method4" element={<Method4 />} />
                <Route path="method5" element={<Method5 />} />


              </Route>
            </Route>

            {/* <Route path="powerData">
              <Route index element={<PowerList/>} component = {PowerList}/>
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route> */}


            {/* <Route path="currentcharts">
              <Route index element={<CurrentChart />} />
            </Route>
            <Route path="voltagecharts">
              <Route index element={<VoltageChart />} component={VoltageChart} />
            </Route>
            <Route path="powercharts">
              <Route index element={<PowerChart />} component={PowerChart} />
            </Route> */}
            <Route path="profile">
              <Route index element={<Profile />} component={Profile} />
            </Route>
            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
