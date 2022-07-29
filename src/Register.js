import { useState } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [emailerr, setemailerr] = useState("");
  const [phoneErr, setphoneErr] = useState("");
  const [passErr, setPass] = useState("");
  const [lengthErr, setLengtherr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const register = {
      name,
      email,
      phoneNumber,
      address,
      password,
      confirmPassword,
    };
    if (!emailerr && !phoneErr && !passErr && !lengthErr) {
      const url = "https://backfiles.herokuapp.com";
      fetch(`${url}/user/signup`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-type": "application/json",
        },
        body: JSON.stringify(register),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            const token = localStorage.getItem("token");
            console.log("i have the token", token);
            const tokens = JSON.parse(atob(token.split(".")[1]));
            localStorage.setItem("role", tokens.role);

            const role = localStorage.getItem("role");
            console.log("this is role in register", role);
            if (role === "user") {
              alert("login succesful!");
              window.location.href = "/order";
            } else {
              window.location.href = "/admin";
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

  function phoneValid(phoneNumber) {
    const pattern = /^(\+|00)[0-9]{1,3}[0-9]{7,14}(?:x.+)?$/;

    if (phoneNumber.match(pattern)) {
      setphoneErr("");
    } else {
      setphoneErr(
        "Phone number should be atleast (8)characters! & should contain a country code"
      );
    }
    if (phoneNumber === "") {
      setphoneErr("");
    }
  }

  function passLength(password) {
    if (password.length <= 5) {
      setLengtherr("Password should be at least 6 characters long");
    } else {
      setLengtherr("");
    }
  }

  function passValid(confirmPassword) {
    if (password === confirmPassword) {
      setPass("");
    } else {
      setPass("password does not match");
    }
    if (confirmPassword === "") setPass("Please fill out this field");
  }

  return (
    <div className="register">
      <h2>Parcel Delivery!!!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:</label><br/>
        <input
          required
          type="text"
          placeholder="Input name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control form-group"
        />
        <br/>

        <label htmlFor="">Email:</label><br/>
        <input
          required
          type="text"
          placeholder="Input email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
            emailvalid(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {emailerr}</p>
        <br/>

        <label htmlFor="">Phone Number:</label><br/>
        <input
          required
          type="text"
          placeholder="Input Number"
          value={phoneNumber}
          onChange={(e) => {
            setphoneNumber(e.target.value);
            phoneValid(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {phoneErr}</p>
        <br/>

        <label htmlFor="">Address:</label><br/>
        <PlacesAutocomplete
          value={address}
          onChange={(e) => setAddress(e)}
          // onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Address...",
                  className: "location-search-input",
                })}
              />
              {
                <div className="autocomplete-dropdown-container">
                  {/* {loading && <div>Loading...</div>} */}
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "blue", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        key={index}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          )}
        </PlacesAutocomplete>
        <br/>

        <label htmlFor="">Password:</label><br/>
        <input
          required
          type="password"
          placeholder="input password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
            passLength(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {lengthErr}</p>
        <br/>

        <label htmlFor="">Confirm password:</label><br/>
        <input
          required
          type="password"
          placeholder="confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
            passValid(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {passErr}</p>
        <br/>
        <button
          type="submit"
          className="signup"
        >Register</button>
        <p className="loginSign">
          Already have an account?<Link to="/login">Login</Link>
        </p>
        <p className="homePage">
         <Link to="/"> Back to Homepage</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
