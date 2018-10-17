import React, { Component } from 'react';
import VenueList from './VenueList.js';

export default class SideBar extends Component {
	render() {
		return(<div className="sideBar">
			<input type={"search"} id={"search"} placeholder={"Filter"} />
			<VenueList {...this.props}
				listItemClick={this.props.listItemClick}
			/>
		</div>)
	}
}