import React, {Component} from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import axios from 'axios';

let distanceMatrixKey = 'AIzaSyCytMXcWTkzc649woDopLpjhbSpJDmchG4'
//let generalMapKey = 'AIzaSyAJcAYSBeEf-SrUjdNw5D3TM-VZ3PGaM0E';

const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAJcAYSBeEf-SrUjdNw5D3TM-VZ3PGaM0E",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ margin: `100px` ,width: `1100px`, height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 43.664486, lng: -79.399689 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )
  
  
  class Cloudy extends React.PureComponent {
    state = {
      search:"",
      value:"",
    }
  
    componentDidMount() {
    }

    handleInputChange = e => {
      this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggestion = (geocodedPrediction, originalPrediction) => {
      console.log(geocodedPrediction, originalPrediction)
      this.setState({search: "", value: geocodedPrediction.formatted_address})
    }
  
    render(){
      const {search, value} = this.state
        return(
            <div>
              <h1 className ="todaysStories">Your Current Location</h1>
    <MyMapComponent  isMarkerShown />
            </div>
        )
    }
}

export default Cloudy;

