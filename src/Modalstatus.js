import React ,{useState}from 'react'

function Modalstatus() {

    const [status, setStatus] = useState("");
    localStorage.setItem("status", status);
  
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const statuss = localStorage.getItem("status");
    const url = "https://backfiles.herokuapp.com";
    const edit = () => {
      fetch(`${url}/parcels/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
  
        body: JSON.stringify({
          status: statuss,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("this is edit res==>", data);
          if (data.status === 1) {
            window.location = "/admin";
            console.log("parcel edited");
          } else {
          }
        });
    };
  return (
    <div className="pageBackground">
      <div className="modalBackground">
      <select required onChange={value=>setStatus(value.target.value)} value={status} id="">
        <option value="">SELECT Status</option>
        <option value="in-transit">in-transit</option>
        <option value="delivered">delivered</option>
        </select><br></br>

        <button
        //   disabled={status === "" ? true : false}
          onClick={() => {
            // closeModal(false);
            edit();
          }}
        >
          submit
        </button>
     
      </div>
    </div>
  )
}

export default Modalstatus