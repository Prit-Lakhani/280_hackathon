/* eslint-disable */
import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";
import Button from "./ACCESSORIES/button";
import Navbar from "./navbar";
import url from "../urlconfig";
import image from "../logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMsg: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios.defaults.withCredentials = true;
    axios({
      url: `${url}/login`,
      method: "post",
      data: { email, password },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          const userDetails = {
            name: res.data[0].u_name,
            currency: getSymbol(res.data[0].u_currency),
          };
          localStorage.setItem("user", JSON.stringify(userDetails));
          window.location.assign("/home");
        }
      })
      .catch((err) => {
        this.setState({ errMsg: err.response.data });
      });
  };

  render() {
    const { errMsg } = this.state;
    if (cookie.load("cookie")) {
      return <Redirect to="/home" />;
    }
    return (
      <div>
        <Navbar />
        <form>
          <br />
          <div className="container w-50">
            <div className="row">
              <div className="col" style={{ textAlign: "right" }}>
                <img
                  src={image}
                  style={{ width: "200px", height: "200x" }}
                  alt=""
                  title="picture"
                />
              </div>
              <div className="col mt-5">
                <h4>
                  <div className="form-group ">
                    <label htmlFor="email">
                      Email ID
                      <input
                        placeholder="name@example.com"
                        type="text"
                        id="emailId"
                        required
                        name="email"
                        className="form-control "
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <div className="form-group ">
                    <label htmlFor="password">
                      Password
                      <input
                        placeholder="********"
                        type="password"
                        id="password"
                        required
                        name="password"
                        className="form-control "
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </label>
                  </div>
                  <Button name="Submit" onClick={this.handleLogin} />
                </h4>
              </div>
            </div>
            <br />
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}

            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
