import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modalcurrent from "./Modalcurrent";
import Modalstatus from "./Modalstatus";

const Admin = () => {
  const [data, setData] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("token");
  if(!token){
    window.location="/login"
  }


  const url = "https://backfiles.herokuapp.com";
  useEffect(() => {
    order();
  }, [token]);
  const order = () => {
    fetch(`${url}/parcels`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((parcels) => {
        console.log("this is parcels", parcels);
        if (parcels) {
          setData(parcels);
        }
      })
      .catch((error) => {
        console.log("this is error===>", error);
      });
  };

  const handleStatus = (id) => {
    const newState = data.map(obj => {
      if (obj._id === id) {
        return {...obj, openModal:true};
      }
    return obj;
    });
    setData(newState);
    localStorage.setItem("id", id);
    // const url = "https://backfiles.herokuapp.com";
    // fetch(`${url}/parcels/${id}/status`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderId: id,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     console.log("this is delete res==>", res);
    //     if (res.message === 1) {
    //       console.log("parcel deleted");
    //       alert("Status Changed Successfully!");
    //     } else {
    //       alert(res.message);
    //     }
    //   });
  };

  const handleCurrent = (id) => {
    const newState = data.map(obj => {
      if (obj._id === id) {
        return {...obj, viewModal:true};
      }
    return obj;
    });
    setData(newState);
    localStorage.setItem("id", id);
    // const url = "https://backfiles.herokuapp.com";
    // fetch(`${url}/parcels/${id}/currentLocation`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "Content-type": "application/json",
    //   },

    //   body: JSON.stringify({
    //     currentLocation: document.getElementById("destination"),
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("this is edit res==>", data);
    //     if (data.message === "Current Location  updated") {
    //       alert("CurrentLocation changed successfully!");
    //     } else {
    //       alert(data.error);
    //     }
    //   });
  };

  const handleLogout = (e) => {
    localStorage.clear();
    console.clear();
  };
  return (
    <div className="admin">
      <div className="login">
        <Link to="/login">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </Link>
        <br></br>
        <h2 className="header">Admin's Order list</h2>
        <ul className="input">
          <li className="list">
            <h3>Number of orders: {data.length}</h3>
          </li>
          <li className="list">
            <h3>
              Orders created:{" "}
              {data.filter((stat) => stat.status === "created").length}
            </h3>
          </li>
          <li className="list">
            <h3>
              In-transit:{" "}
              {data.filter((stat) => stat.status === "in-transit").length}
            </h3>
          </li>
          <li className="list">
            <h3>
              Delivered Orders:{" "}
              {data.filter((stat) => stat.status === "delivered").length}
            </h3>
          </li>
        </ul>
      </div>
      <table className="table ">
        <thead className="table">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Item description</th>
            <th scope="col">price</th>
            {/* <th scope="col">weight</th> */}
            <th scope="col">Pickup Location</th>
            <th scope="col">Destination</th>
            <th scope="col">Current location</th>
            <th scope="col">Recipient Name</th>
            <th scope="col">Recipient Mobile Number</th>
            <th scope="col">Order Status</th>
            <th scope="col">Edit Status</th>
            <th scope="col">Edit current location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.itemDescription}</td>
              <td>{"₦" + item.price.toLocaleString() + ".00"}</td>
              <td>{item.pickupLocation}</td>
              <td>{item.destination}</td>
              <td>{item.currentLocation}</td>
              <td>{item.recipientName}</td>
              <td>{item.recipientNumber}</td>
              <td>{item.status}</td>
              <td className="status">
              {item.openModal && <Modalstatus  />}
              <button
                  onClick={() => {
                    handleStatus(item._id);
                    // setOpenModal(true);
                  }}
                  // className="btn btn-secondary p-1 pl-2"
                  // disabled={item.status === "cancelled" ? true : false}
                >status
                 
                  <i className="fas fa-edit" />
                </button>
              </td>
              <td className="current">
              {item.viewModal && <Modalcurrent  />}
              <button
                  onClick={() => {
                    handleCurrent(item._id);
                    // setOpenModal(true);
                  }}
                  disabled={item.status === "delivered" ? true : false}
                >current
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
