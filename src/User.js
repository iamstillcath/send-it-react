import React, { useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
// import { faFontAwesome } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";

const User = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(true);
  const history = useHistory();

  const token = localStorage.getItem("token");
  if (!token) {
    window.location = "/login";
  }

  const url = "https://backfiles.herokuapp.com";
  useEffect(() => {
    order();
  }, [token]);
  const order = () => {
    fetch(`${url}/parcels/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "*/*",
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((parcels) => {
        if (parcels.length === 0) {
          setShow(false);
        } else {
          setData(parcels);
        }
      })
      .catch((error) => {
        console.log("this is error===>", error);
      });
  };

  const handleDelete = (id) => {
    const url = "https://backfiles.herokuapp.com";
    alert("do you want to delete");
    fetch(`${url}/parcels/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Order Deleted") {
          alert("parcel deleted")
        } else {
          alert(res.error);
        }
      });
  };

  const handleEdit = (id) => {
    const newState = data.map((obj) => {
      if (obj._id === id) {
        return { ...obj, openModal: true };
      }

      return obj;
    });
    setData(newState);
    localStorage.setItem("id", id);
  };

  const handleLogout = () => {
    localStorage.clear();
    console.clear();
  };

  return (
    <div className="user">
      <div className="user">
        <Link to="/login">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </Link>
        <br></br>
        <Link to="/order">
          <p>CREATE ORDER</p>
        </Link>
        <h2 className="header"> Order list</h2>
        <ul className="list-group">
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
      <table
        className="table"
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <thead className="table">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Item description</th>
            <th scope="col">price</th>
            <th scope="col">Pickup Location</th>
            <th scope="col">Destination</th>
            <th scope="col">Current location</th>
            <th scope="col">Recipient Name</th>
            <th scope="col">Recipient Mobile Number</th>
            <th scope="col">Order Status</th>
            <th scope="col">Edit Destination</th>
            <th scope="col">Cancel Parcel Order</th>
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

              <td className="edit">
                {item.openModal && <Modal closeModal={setOpenModal} />}
                <button
                  onClick={() => {
                    handleEdit(item._id);
                  }}
                  disabled={item.status === "delivered" ? true : false}
                >
                  Edit
                  {/* <faFontAwesome className="fas fa-edit"></faFontAwesome> */}
                </button>
              </td>
              <td className="delete">
                <Link to="/order">
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={item.status === "delivered" ? true : false}
                  >
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
