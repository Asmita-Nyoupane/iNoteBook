import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("invalid credentials");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputEmail1">Email address</label>
    //       <input
    //         type="email"
    //         className="form-control my-2"
    //         id="exampleInputEmail1"
    //         aria-describedby="emailHelp"
    //         value={credentials.email}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="exampleInputPassword1">Password</label>
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="exampleInputPassword1"
    //         autoComplete="off"
    //         // placeholder="Password"
    //         value={credentials.password}
    //         onChange={onChange}
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary my-2">
    //       Submit
    //     </button>
    //   </form>
    // </div>
  );
};

export default Login;
