import React, { Component } from 'react';

class Sidebar extends Component {

	constructor(props) {
		super(props);
	}


    //renders sidebar
	render() {
		return(
			<div id="sidebar">
            	<input tabIndex="1" type={"search"} id={"search"} placeholder={"Filter Coffee Shops"} value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} />
            	<br/>
            	{
              		this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue,index) => (
                		<div tabIndex="2" role="link" key={index} className="venue-item" onClick={() => { this.props.listItemClick(venue) }}>
                  			{venue.name}
                		</div>
                	))
            	}
        	</div>
    	);
	}
}


export default Sidebar;