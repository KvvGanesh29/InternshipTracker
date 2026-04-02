import { useState } from "react";

function Login({ setAuth }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    if (user === "admin" && pass === "admin123") {
      setAuth(true);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setUser(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPass(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;