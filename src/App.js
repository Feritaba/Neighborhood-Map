import React, { Component } from 'react';
import './App.css';
// import axios from 'axios';
import SideBar from './SideBar.js';
import SquareAPI from "./Library.js";

class App extends Component {

  constructor() {

    super();
    this.state = {
      venues : [],
      markers :[],
      center:[]
    }
  }

    componentDidMount() {
      SquareAPI.search({
      near:"San Jose, CA",
      query:"coffee",
      limit: 12
    }).then(results => {
     // console.log(results),
     // console.log(results.response.venues),
     this.setState({venues: results.response.venues}),
     // console.log(this.venues.items),
      this.renderMap()
    });

    // this.getVenues();
   }

  markerClick= marker => {
    marker.isOpen = true;
    this.setState ({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    // this.props.getVenues.getVenueDetails(marker.id).then(res=> {
      SquareAPI.getVenueDetails(marker.id).then(res=> {
      const newVenue = Object.assign(venue, res.response.venue);
      console.log(newVenue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
    })
  }


  listItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.markerClick(marker);
   }



  //Load map
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyB3ro0efVYXR4fpp2LGFy_OH_1pYSGr5zU&callback=initMap")
    window.initMap = this.initMap
  }

  //This function calls the api(async)
  // getVenues = () => {
  //   const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  //   const parameters = {
  //     client_id: "V0MGSNY43UW3DAQ4O5H0WQ2APPZNTVJ2X503OCDPEWPIVLG1",
  //     client_secret: "VYIZPC2KDMBWEK3Q5ESDRORXXYBBFJ0LDAWP5NDNWZAYCIAH",
  //     query: "coffee",
  //     near: "San Jose",
  //     v:"20182507"
  //   }

  //   //Get data and store it in venues
  //   axios.get(endPoint + new URLSearchParams(parameters))
  //     .then(response => {
  //       this.setState({
  //         venues: response.data.response.groups[0].items
  //       }, console.log(response)
  //       ,this.renderMap())
  //   })
  //   .catch(error => {
  //     console.log("error " + error)
  //   })
  // }

  //Creates map in map id html tag
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.335, lng: -121.893},
      zoom: 12
    });

    //Create infowindow
    let infowindow = new window.google.maps.InfoWindow();

    //Display markers
    this.state.venues.map(myVenue => {

      // let contentString = `${myVenue.venue.name}`;
      let contentString = `${myVenue.name}`;

      //create map markers
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.location.lat, lng: myVenue.location.lng},
        map: map,
        title: myVenue.name
      });

      //Open info window on click
      marker.addListener('click', function() {
        
        //Change the content
        infowindow.setContent(contentString)

        //Open info window
        infowindow.open(map, marker);

      });
    })
  }

  render() {
    return (
      <main>
        <div>
            <h1>Neghiborhood Map</h1>
        </div>
        <div id="map"></div>
        <div id="sideBar"><SideBar {...this.state} listItemClick={this.listItemClick}/></div> 
      </main>
    );
  }
}



function loadScript(url) {
  let index  = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
