/* eslint-disable */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cookie from "react-cookies";
import { Link, Redirect } from "react-router-dom";
import image from "../logo.svg";
import "./navbar.css";
import "../splitwise.css";

class Navbar extends PureComponent {
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    localStorage.clear();
    <Redirect to="/" />;
  };

  getLoginTabs = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let navLogin = null;
    if (cookie.load("cookie")) {
      navLogin = (
        <>
          <li className="nav-item">
            <a className="nav-link text-white" href="/home" role="button">
              {/* <Link to="/home" style={{ color: 'white' }}> */}
              <span className="glyphicon glyphicon-home" />
              {"  "}
              <h4 className="inline">Home</h4>
              {/* </Link> */}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/profile" role="button">
              <span className="glyphicon glyphicon-user mr-1" />
              <h4 className="inline">{user.name}</h4>
            </a>
            {/* <Link to="/profile" style={{ color: 'white' }}>
              <span className="glyphicon glyphicon-user mr-1" />
              {'  '}
              <h4 className="inline">{user.name}</h4>
            </Link> */}
          </li>
          <li className="nav-item">
            <Link to="/" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-log-out mr-1" />
              <h4 className="inline">Logout</h4>
            </Link>
          </li>
        </>
      );
    } else {
      navLogin = (
        <>
          <a
            href="/login"
            className="btn btn-large m-1"
            style={{ backgroundColor: "#FF652F", color: "white" }}
          >
            Login
          </a>
          {/* <a
            href="/signup"
            className="btn btn-large m-1"
            style={{ backgroundColor: "#FF652F", color: "white" }}
          >
            Sign Up
          </a> */}
        </>
      );
    }
    return navLogin;
  };

  render() {
    return (
      <>
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "#0096FF" }}
        >
          <div className="navbar-brand mb-0 mt-0 h1">
            <img
              src={image}
              width="40"
              height="40"
              alt=""
              style={{ display: "inline-block" }}
            />
            <h1 className="inline">
              <b>
                <a href="/home" style={{ color: "white" }}>
                  FOOD SECURITY
                </a>
              </b>
            </h1>
          </div>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon" />
          </button>
          <ul
            className="nav nav-menu ml-auto"
            style={{ listStyleType: "none" }}
          >
            {/* {this.getLoginTabs()} */}
            <li className="nav-item">
              <a className="nav-link text-white" href="/home" role="button">
                <span className="glyphicon glyphicon-home" />
                {"  "}
                <h4 className="inline">HOME</h4>
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Navbar.defaultProps = {
  colour: "5BC5A7",
  textColour: "FFFFFF",
};

export default Navbar;