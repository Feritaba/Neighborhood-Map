import React, { Component } from 'react';
import ListItem from './ListItem.js';

export default class VenueList extends Component {
	render() {
		return(<ol className="venueList">
			<ListItem />
		</ol>)
	}
}