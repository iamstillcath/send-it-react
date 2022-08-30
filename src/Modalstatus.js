import React ,{useState}from 'react'
import { useHistory } from "react-router-dom";

const Modalstatus=() =>{

    const [status, setStatus] = useState("");
    const history=useHistory()
    localStorage.setItem("status", status);
  
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const statuss = localStorage.getItem("status");
    const edit = () => {
    const url = "https://backfiles.herokuapp.com";
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
          if (data.status === 1) {
            alert("status updated")
            window.location.href("/admin")
          } else {
            alert(data.error)
          }
        });
    };
  return (
    <div className="pageBackground">
      <div className="modalBackground">
        <form onSubmit={edit}>
      <select required onChange={value=>setStatus(value.target.value)} value={status} id="">
        <option value="">SELECT Status</option>
        <option value="created">created</option>
        <option value="in-transit">in-transit</option>
        <option value="delivered">delivered</option>
        </select><br></br>
       
        <button
          type='submit'
          
        >
          submit
        </button>
        </form>
      </div>
    </div>
  );
};

export default Modalstatus