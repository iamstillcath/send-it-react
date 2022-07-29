import React, { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

function Modal({ closeModal }) {
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
        console.log("this is edit res==>", data);
        if (data.message === "Destination updated") {
          window.location = "/user";
          console.log("parcel edited");
        } else {
        }
      });
  };

  return (
    <div className="pageBackground">
      <div className="modalBackground">
      <PlacesAutocomplete
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          // onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
          }) => (
            <div>
              <input
               required
                {...getInputProps({
                 
                  placeholder: "Destination...",
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
        </PlacesAutocomplete>

        <button
          disabled={destination === "" ? true : false}
          onClick={() => {
            closeModal(false);
            edit();
          }}
        >
          submit
        </button>
    
      </div>
    </div>
  );
}

export default Modal;
