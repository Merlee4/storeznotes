import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      msg: "",
      loading: false,
    };
    this.handleLogin.bind = this.handleLogin.bind(this);
  }

  handleLogin = (e) => {
    this.setState({ handleLogin: true });
    e.preventDefault();
    axios
      .post("https://storiez-backend-server.herokuapp.com/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.error) {
          this.setState({ msg: res.data.error });
          this.setState({ loading: false });
        } else {
          const data = JSON.stringify(res.data);
          sessionStorage.setItem("client", data);
          this.setState({ loading: false });
          if (sessionStorage.getItem("client")) {
            this.props.history.push("/dash");
          }
        }
      })
      .catch(() => {
        if (
          JSON.parse(sessionStorage.getItem("client")).email ===
          this.state.email
        ) {
          this.props.history.push("/dash");
        }
      });
  };

  render() {
    if (sessionStorage.getItem("client")) {
      this.props.history.push("/dash");
    }
    return (
      <div className="w-screen h-screen flex">
        <div className="my-auto mx-auto w-96 sm:border-0 md:border rounded-lg p-4">
          <h1 className="text-3xl font-semibold">Login </h1>
          <p className="text-sm mt-2">
            By signing in you agree to the terms and conditions that will never
            exist for this app.
          </p>
          <form className="flex flex-col" onSubmit={(e) => this.handleLogin(e)}>
            <input
              type="email"
              className="border rounded mt-2 p-2"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
            <input
              type="password"
              className="border rounded mt-2 p-2"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button
              className="bg-black p-2 rounded text-white mt-2"
              type="submit"
            >
              {this.state.loading ? "Loading..." : "Sign in"}
            </button>
            <small className="text-center text-red-700 mt-4">
              {this.state.msg}
            </small>
            <Link to="/signup" className="text-center underline">
              Create Account
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
