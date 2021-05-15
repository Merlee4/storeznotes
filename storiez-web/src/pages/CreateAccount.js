import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RefreshIcon } from "@heroicons/react/outline";

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setComfirm] = useState("");
  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");
  const router = useHistory();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();

    if (confirm !== password) {
      alert("Your passwords do not match");
    } else {
      axios
        .post("https://storiez-backend-server.herokuapp.com/signup", {
          email: email,
          password: password,
          name: name,
        })
        .then((res) => {
          if (res.data.error) {
            setMsg(res.data.error);
            setLoading(false);
          } else {
            router.push("/");
          }
        });
    }
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="my-auto mx-auto w-96 border rounded-lg p-4">
        <h1 className="text-3xl font-semibold">Create </h1>
        <p className="text-sm mt-2">
          By signing up you agree to the terms and conditions that will never
          exist for this app.
        </p>
        <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>
          <input
            required
            type="email"
            className="border rounded mt-2 p-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="border rounded mt-2 p-2"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            required
            type="password"
            className="border rounded mt-2 p-2"
            placeholder="Comfirm Password"
            onChange={(e) => setComfirm(e.target.value)}
          />
          <input
            required
            type="text"
            className="border rounded mt-2 p-2"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-black p-2 rounded text-white mt-2"
            type="submit"
          >
            {loading ? <RefreshIcon className="h-6 mx-auto " /> : "Create Account"}
          </button>
          <small className="text-center text-red-700 mt-4">{msg}</small>
          <Link to="/" className="text-center underline">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
