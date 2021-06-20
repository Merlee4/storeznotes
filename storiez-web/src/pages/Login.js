
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RefreshIcon } from "@heroicons/react/outline";

import logo from '../components/images/Icon.png';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            msg: "",
            loading: false,
        };
        this.handleLogin.bind = this.handleLogin.bind(this);
    }

    handleLogin = (e) => {
        this.setState({ handleLogin: true, loading: true });
        e.preventDefault();
        axios.post("http://localhost:9000/login", {
            email: this.state.email,
            password: this.state.password,
        }).then((res) => {
            console.log(res.data)
            if (res.data.error) {
                this.setState({
                    msg: res.data.error,
                    loading: false
                });
            } else {
                const data = JSON.stringify(res.data);
                localStorage.setItem("client", data);
                window.location = "/";
                this.setState({ loading: false });
            }
        })
    };

    render() {
        return (
            < div className="w-screen h-screen flex">
                {/* Render Login */}
                <div className="my-auto mx-auto w-96 sm:border-0 md:border rounded-lg p-4">
                    {/* Storiez Notes Logo on small Screens */}
                    <div className=" left-4 flex items-center md:hidden flex mb-20">
                        <img src={logo} className="h-16 " alt="logo" />
                    </div>
                    {/* Login Text */}
                    <h1 className="text-3xl font-semibold">Login </h1>
                    <p className="text-sm mt-2">
                        By signing in you agree to the terms and conditions that will never
                        exist for this app.
                    </p>
                    {/* Login Form */}
                    <form className="flex flex-col" onSubmit={(e) => this.handleLogin(e)}>
                        {/* Email Input */}
                        <input
                            type="email"
                            className="border rounded mt-2 p-2"
                            placeholder="Email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        {/* Password Input */}
                        <input
                            type="password"
                            className="border rounded mt-2 p-2"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        {/* Login Buttton */}
                        <button
                            className="bg-black p-2 rounded text-white mt-2"
                            type="submit"
                        >
                            {this.state.loading === true ? <RefreshIcon className="h-6 mx-auto " /> : "Sign in"}
                        </button>
                        {/* Create an account link */}
                        <small className="text-center text-red-700 mt-4">
                            {this.state.msg}
                        </small>
                        <Link to="/signup" className="text-center underline">
                            Create Account
                        </Link>
                    </form>
                </div>
                {/* Storiez Notes Logo on Large Screens */}
                <div className="absolute bottom-4 left-4 flex items-center hidden lg:flex">
                    <img src={logo} className="h-16 " alt="logo" />
                    <p className="text-3xl text-gray-800">Notes</p>
                </div>
            </div>

        );
    }
}

export default Main;
