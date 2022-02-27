import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App'
import Navlist from '../common/navlist'
// import SearchModal from "../common/SearchModal";

import '../css/navbar.css'
export default function Navbar() {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  const HandleLogout = () => {
    localStorage.clear()
    dispatch({ type: "CLEAR" })
    navigate("/signIn")
  }

  const renderlist = () => {
    if (state) {
      return [
        <Navlist key={1} name="Home" route="/" icon="fas fa-home" />,
        <Navlist key={7} name="My Network" route="/mynetwork" icon="fas fa-images" />,
        <Navlist key={3} name="CreatePost" route="/createPost" icon="fas fa-icons" />,

        <li className="nav-item" key={5} data-bs-toggle="modal" data-bs-target="#exampleModal" >
          <span>Search</span>
          <i className="fas fa-search" ></i>
        </li>,
        <Navlist key={2} name="Profile" route="/profile" icon="fas fa-user-circle" />,
        // <li className="nav-item" key={2} data-bs-dismiss="offcanvas">
        //   <Link to="/profile">
        //     <img className="navprofile" src={state ? state.pic : "..."} alt="" />
        //   </Link>
        // </li>,
        <li onClick={HandleLogout} className="nav-item" key={6}>
          <span>Logout</span>
          <i className="fas fa-sign-out-alt"></i>
        </li>
      ]
    }
    else {
      return [
        <Navlist key={5} name="About" route="/about" icon="fas fa-info-circle" />,
        <Navlist key={6} name="Login" route="/signIn" icon="fas fa-sign-in-alt" />,
        <Navlist key={7} name="Sign Up" route="/signUp" icon="fas fa-user-plus" />,
      ]
    }
  }
  return (
    <>
      <nav className="navbar" expand="false">
        <Link className="logo" to={state ? "/" : "/signIn"}>
          <img src="https://cdn-icons-png.flaticon.com/512/1527/1527553.png" alt="" />
          <div className="mt-3"  style={{display:"inline-block"}}>
          <h5 style={{ color: "white", display: "inline", marginLeft: "10px" }}>TalentHub</h5>
          </div>
        </Link>
        <Link className="logo" to={state ? "/" : "/signIn"}>
          
        </Link>
        <div className="navContainer">
          {state ?
            <>
              <ul className="navlink">
                {renderlist()}
              </ul>
              <i className="fas fa-bars toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
            </>
            :
            <>
              <ul className="withoutstate">
                {renderlist()}
              </ul>
            </>
          }
        </div>

        {state &&
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <li className="nav-item" key={2}>
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <img className="canvasprofile" src={state ? state.pic : "..."} alt="" />
                  <h6 className="canvasName">{state ? state.name : "..."}</h6>
                </Link>
              </li>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navlinks">
                <div>
                  {renderlist()}
                </div>
              </ul>
            </div>
          </div>
          // :
          // <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          //   <div className="offcanvas-header">
          //     <li className="nav-item" key={2}>
          //       <Link to="/profile" style={{ textDecoration: "none" }}>
          //         <img className="canvasprofile" src={state ? state.pic : "..."} alt="" />
          //         <h6 className="canvasName">{state ? state.name : "..."}</h6>
          //       </Link>
          //     </li>
          //   <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          //   </div>
          //   <div className="offcanvas-body">
          //     <ul className="navlinks">
          //       <div>
          //         {renderlist()}
          //       </div>
          //     </ul>
          //   </div>
          // </div>
        }
      </nav>

    </>
  );
}
