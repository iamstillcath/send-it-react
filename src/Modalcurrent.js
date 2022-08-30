import { type } from '@testing-library/user-event/dist/type';
import React ,{useState}from 'react';
import { useHistory } from "react-router-dom";

const Modalcurrent= ()=> {
    const [currentLocation, setcurrentLocation] = useState("");
    const history=useHistory()
    localStorage.setItem("currentLocation", currentLocation);
  
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const currentLocations = localStorage.getItem("currentLocation");
   
    const edit = () => {
      const url = "https://backfiles.herokuapp.com";
      fetch(`${url}/parcels/${id}/currentLocation`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
  
        body: JSON.stringify({
          currentLocation: currentLocations,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Current Location updated") {
            
            window.location.href("/admin")
          } else {
            alert(data.error)
           
          }
        });
    };
  return (
    <div className="pageBackground">
      <div className="modalBackground">
      {/* <PlacesAutocomplete
          value={currentLocation}
          onChange={(e) => setcurrentLocation(e.target.value)}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
              required
                {...getInputProps({
                  placeholder: "Current Location...",
                  className: "location-search-input",
                })}
              />
              {
                <div className="autocomplete-dropdown-container">
                  {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
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
        </PlacesAutocomplete> */}
        <form onSubmit={edit}>
        <input type="text"
        required
        value={currentLocation} 
        onChange={(e)=>setcurrentLocation(e.target.value)}
        placeholder="currentlocation..."/>
        <br/>

        <button
          disabled={currentLocation === "" ? true : false}
       
          type='submit'
        >
          submit
        </button>
        </form>
        
      </div>
    </div>
  )
}

export default Modalcurrent