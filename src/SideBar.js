import React, { Component } from 'react';


class Sidebar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div id="sidebar">
            	<input tabindex="1" type={"search"} id={"search"} placeholder={"Filter Coffee Shops"} value={this.props.query} onChange={(e) => { this.props.filterVenues(e.target.value) }} />
            	<br/>
            	{
              		this.props.filteredVenues && this.props.filteredVenues.length > 0 && this.props.filteredVenues.map((venue,index) => (
                		<div tabindex="2" key={index} className="venue-item" onClick={() => { this.props.listItemClick(venue) }}>
                  			{venue.name}
                		</div>
                	))
            	}
        	</div>
    	);
	}
}


export default Sidebar;