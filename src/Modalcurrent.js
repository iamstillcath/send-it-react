import React ,{useState}from 'react';
import PlacesAutocomplete from "react-places-autocomplete";

function Modalcurrent() {
    const [currentLocation, setcurrentLocation] = useState("");
    localStorage.setItem("currentLocation", currentLocation);
  
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const currentLocations = localStorage.getItem("currentLocation");
    const url = "https://backfiles.herokuapp.com";
    const edit = () => {
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
          console.log("this is edit res==>", data);
          if (data.message === "Current Location  updated") {
            window.location = "/admin";
            console.log("parcel edited");
          } else {
            alert(data.error)
            window.location = "/admin";
          }
        });
    };
  return (
    <div className="pageBackground">
      <div className="modalBackground">
      <PlacesAutocomplete
          value={currentLocation}
          onChange={(e) => setcurrentLocation(e.target.value)}
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
              required
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

        <button
          disabled={currentLocation === "" ? true : false}
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

export default Modalcurrent