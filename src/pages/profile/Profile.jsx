import "./profile.css";
import '../home/home.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
      const {isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0();
      const isUser = isAuthenticated && user;
  return (
    <>
      {/* <div className="profile"> */}
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* <img
                className="profileCoverImg"
                src={user.picture}
                alt={user.name}
              /> */}
              <img
                className="profileUserImg"
                src={user.picture}
                alt={user.name}
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.name}</h4>
                <p className="profileInfoName">{user.email}</p>
                <span className="profileInfoDesc">Load Forecasting Final Year Project</span>
            </div>
          </div>
          <div className="profileRightBottom">
          </div>
        </div>
      </div>
    </div>
      {/* </div> */}
    </>
  );
}