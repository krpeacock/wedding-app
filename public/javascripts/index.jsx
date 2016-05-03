"use strict";

var Page = React.createClass({
	displayName: "Page",
	getInitialState: function getInitialState (){
		return {
			allGuests: [],
			guests: []
		}
	},
	updateGuests: function () {
		var idx = this.state.guests.map(function (v) {
			v.id
		}).indexOf(guest.id)
		this.state.guests[idx] = guest;
		this.setState({
			guests: this.state.guests
		})
	},
	searchFilter: function searchFilter(e){
		var search = e.target.value.toLowerCase();
		var guests = this.state.allGuests;
		var filtered;
		filtered = guests.filter(function(val, index){
			return val.name.toLowerCase().indexOf(search) > -1;
		})
		this.setState({guests: filtered})
	},
	componentWillMount: function () {
		$.getJSON("/guests").then((function(guests ) {
			this.setState({
				guests: guests,
				allGuests: guests,
			});
		}).bind(this));
	},
	render: function () {
		var listGuests = this.state.guests.map(function(v,i){
			return	(
				<div className = "tile" key={i} >

					<Guest
						name={v.name}
						id={v.id}
						address={v.json['Mailing Address']}
						email={v.json['Email Address']}
						rsvp={v.json['RSVP']}
						thanked={v.json['Thanked']}
					/>
				</div>
			)
		})
		return(
			<div>
				<h1>Wedding Guest Manager</h1>
				<MenuBox searchFilter={this.searchFilter}
				/>
				{listGuests}
			</div>
		)
	}
});

var Guest = React.createClass({
	render: function () {
		return (
			<div>
				<a href={"/" + this.props.id}>
					<h3>
					{this.props.name}
					</h3>
				</a>
				<p>Address: {this.props.address}</p>
				<p>Email: {this.props.email}</p>
				<p>RSVP'ed: {this.props.rsvp}</p>
				<p>Thanked: {this.props.thanked}</p>
			</div>
	)
	}
});

var MenuBox = React.createClass({
	render: function (){
		return(
			<div className="dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					Filter <span className="caret"></span>
				</button>
				<div className="dropdown-menu pull-right dropdown-menu-right" aria-labelledby="dropdownMenu1">
					<form className="form-horizontal" role="form">
						<a href="#top"> Scroll to the Top </a>
						<br/>
						<div className="input-group">
							<label>Search: </label>
							<input onKeyUp={this.props.searchFilter} type="text"/>
						</div>
					</form>
				</div>
			</div>
		)
	}
})

ReactDOM.render( < Page / > , document.getElementById('container'));
