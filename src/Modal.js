import React, { useState } from "react";

const Modal=()=> {
  const [destination, setDestination] = useState("");
  localStorage.setItem("destination", destination);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const destinations = localStorage.getItem("destination");
  const url = "https://backfiles.herokuapp.com";
  const edit = () => {
    fetch(`${url}/parcels/${id}/destination`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        destination: destinations,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Destination updated") {
          alert("destination updated")
          window.location.href("/user")
        } else {
          alert(data.error); 
          
        }
      });
  };

  return (
    <div className="pageBackground">
      <div className="modalBackground">
        <form onSubmit={edit}>
        <input
          type="text"
          required
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination..."
        />
        <br />
        <button
        
          disabled={destination === "" ? true : false}
          // onClick={() => {
          //   closeModal(false);
          //   edit();
          // }}
          type="submit"
        >
          submit
        </button>
  
        </form>
      </div>
    </div>
  );
}

export default Modal;
