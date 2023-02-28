import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BoltIcon from "@mui/icons-material/Bolt";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';


const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "current":
      data = {
        title: "CURRENT",
        isMoney: false,
        unit: " A",
        link: "Peak Current",
        icon: (
          <BoltIcon
            className="icon"
            style={{
              color: "yellow",
              backgroundColor: "rgba(218, 165, 32, 0.2)",
            }}
          />
        ),
      };
      break;
    case "voltage":
      data = {
        title: "VOLTAGE",
        isMoney: false,
        unit: " V",
        link: "Peak Voltage",
        icon: (
          <ElectricMeterIcon
            className="icon"
            style={{
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "power":
      data = {
        title: "POWER",
        isMoney: true,
        unit: " W",
        link: "Peak Power",
        icon: (
          <BatteryChargingFullIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    // case "balance":
    //   data = {
    //     title: "BALANCE",
    //     isMoney: true,
    //     link: "See details",
    //     icon: (
    //       <AccountBalanceWalletOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(128, 0, 128, 0.2)",
    //           color: "purple",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
         {amount} {data.unit}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
