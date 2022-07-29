import React,{Component} from 'react';
import PlacesAutocomplete  from 'react-places-autocomplete'

class Place extends Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
      }
     
      handleChange =(address) => {
        this.props.onChange({
          ...this.props.value,  // keep the other values like firstName, lastName
          address: address 
  
        // this.setState({ address });
        
      });
    }
    render() { 
        return (
            <PlacesAutocomplete
        value={this.props.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Adress...',
                className: 'location-search-input',
              })}
            />
            { <div className="autocomplete-dropdown-container">
              {/* {loading && <div>Loading...</div>} */}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: 'blue', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div> }
          </div>
        )}
      </PlacesAutocomplete>
        );
    }
}
 
export default Place;