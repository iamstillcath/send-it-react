import { useState } from "react";
import { Link } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
import { useHistory } from "react-router-dom";

const Order = () => {
  const [itemDescription, setitemDescription] = useState("");
  const [price, setprice] = useState("");
  const [weight, setweight] = useState("");
  const [pickupLocation, setpickupLocation] = useState("");
  const [destination, setdestination] = useState("");
  const [recipientName, setrecipientName] = useState("");
  const [recipientNumber, setrecipientNumber] = useState("");
  const [phoneErr, setphoneErr] = useState("");
  const history =useHistory()


 
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      itemDescription,
      price,
      weight,
      pickupLocation,
      destination,
      recipientName,
      recipientNumber,
    };
    if (!phoneErr) {
      const token = localStorage.getItem("token");

      if (!token) {
        history.push("/login");
      }

      const url = "https://backfiles.herokuapp.com";
      fetch(`${url}/parcels`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "order successfully created") {
            alert("parcel created successfully!");
            localStorage.setItem("userId", data.data.id);
             history.push("/user");
             
          } else {
            alert(data.errors.recipientNumber);
          }
        });
    }
  };

  const handleDelete = (e) => {
    localStorage.clear();
  };


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

  function PriceValue(weight) {
    if (weight) {
      setprice(weight * 330);
    } else {
      setprice("");
    }
  }
  return (
    <div className="order">
      <Link to="/user">
      
        <button>View Created Orders</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button className="logout" onClick={handleDelete}>
          Logout
        </button>
      </Link>
      <h2 className="login">Welcome User</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">itemDescription:</label>
        <br />
        <input
          required
          type="text"
          placeholder="Input itemDescription"
          value={itemDescription}
          onChange={(e) => setitemDescription(e.target.value)}
          className="form-control form-group"
        />
        <br />

        <label htmlFor="">weight:</label>
        <br />
        <input
          required
          type="number"
          placeholder="Input weight"
          value={weight}
          onChange={(e) => setweight(e.target.value)}
          onInput={(e) => {
            PriceValue(e.target.value);
          }}
          className="form-control form-group"
        />
        <br />

        <label htmlFor="">price:</label>
        <br />
        <input
          required
          disabled
          type="text"
          placeholder="Input price"
          value={price}
          onChange={(e) => {
            setprice(e.target.value);
          }}
          className="form-control form-group"
        />
        <br />

        <label htmlFor="">Pickup Location:</label>
        <PlacesAutocomplete
          value={pickupLocation}
          onChange={(e) => setpickupLocation(e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "pickupLocation...",
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
        <br />

        <label htmlFor="">Destination:</label>
        <PlacesAutocomplete
          value={destination}
          onChange={(e) => setdestination(e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "destination...",
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
        <br />

        <label htmlFor="">Recipient Name:</label>
        <br />
        <input
          required
          type="text"
          placeholder="Input recipientName"
          value={recipientName}
          onChange={(e) => setrecipientName(e.target.value)}
          className="form-control form-group"
        />

        <br />

        <label htmlFor="">Recipient Number:</label>
        <br />
        <input
          required
          type="text"
          placeholder="Input recipientNumber"
          value={recipientNumber}
          onChange={(e) => {
            setrecipientNumber(e.target.value);
            phoneValid(e.target.value);
          }}
          className="form-control form-group"
        />
        <p style={{ color: "red" }}> {phoneErr}</p>

        <button type="submit" className="submit" value="Create">
          Create
        </button>
      </form>
    </div>
  );
};

export default Order;
