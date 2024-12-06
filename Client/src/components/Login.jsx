import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
        }

        else {
          toast.error(data.message);
        }
      }

      else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        }
        
        else {
          toast.error(data.message);
        }
      }
    }

    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm flex justify-center items-center bg-black/30">
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>

        {state === "Login" ? (
          <p className="text-sm">Welcome back! Please sign in to continue.</p>
        ) : (
          <p className="text-sm">
            Welcome! Please create an account to continue.
          </p>
        )}
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 mt-5 rounded-full">
            <img src={assets.profile_icon} alt="Profile Icon" width={20} />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="outline-none text-sm"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 mt-3 rounded-full">
          <img src={assets.email_icon} alt="Profile Icon" />
          <input
            type="email"
            placeholder="Email id"
            required
            className="outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 mt-3 rounded-full">
          <img src={assets.lock_icon} alt="Profile Icon" />
          <input
            type="password"
            placeholder="Password"
            required
            className="outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-blue-600 cursor-pointer my-4">
            Forgot Password?
          </p>
        )}

        <button
          className={`bg-blue-600 rounded-full w-full text-white py-2 ${
            state !== "Login" ? "mt-5" : ""
          } `}
        >
          {state === "Login" ? "Login" : "Create account"}
        </button>

        {state === "Login" ? (
          <p className="text-center mt-5">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setState("Sign up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-center mt-5">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => setState("Login")}
            >
              Sign in
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt="Close Icon"
          className="cursor-pointer absolute top-5 right-5"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
