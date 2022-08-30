import { useState} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [emailerr, setemailerr] = useState("");
  const history =useHistory()
  



  const handleSubmit = (e) => {
    
    e.preventDefault();
 
    const login = {
      email,
      password,
    };
    // const token = localStorage.getItem("token");
    // const tokens = JSON.parse(atob(token.split(".")[1]));
    // localStorage.setItem("role", tokens.role);

    // if (token) {
    //   const role = localStorage.getItem("role");
    //   if (role === "user") {
    //     window.location.href = "./order.html";
    //   } else {
    //     window.location.href = "./admin.html";
    //   }
    // }

    if (!emailerr) {
      const url = "https://backfiles.herokuapp.com";
      fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(login),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            const token = localStorage.getItem("token");
            const tokens = JSON.parse(atob(token.split(".")[1]));
            localStorage.setItem("role", tokens.role);

            const role = localStorage.getItem("role");
            if (role === "user") {
              alert("login succesful!");
              history.push("/order")
            } else {
              history.push("/admin");
            }
          } else {
            alert(res.message);
          }
        });
    }
  };

  function emailvalid(email) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (email.match(pattern)) {
      setemailerr("");
    } else {
      setemailerr("Enter a valid email address!");
    }
    if (email === "") {
      setemailerr("");
    }
  }
  return (
    <div className="loginPage">
      <h2 className="login">
        Login your Parcel Delivery account to get started
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Email:</label>
        <br></br>
        <input
          required
          type="text"
          placeholder="Input email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            emailvalid(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {emailerr}</p>
        <br></br>

        <label htmlFor="">Password:</label>
        <br></br>
        <input
          required
          type="password"
          placeholder="input password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="form-control form-group"
        />
        <br></br>
        <br></br>
        <button
          type="submit"
          className="block"
          // value="Login"
        >
          Login
        </button>

        <p className="loginSign">
          Don't have an account?<Link to="/">Register</Link>
        </p>
        <p className="homePage">
          <Link to="/">Back to Homepage</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
