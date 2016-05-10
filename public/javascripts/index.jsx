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
	handleToggle: function handleToggle(e){
		if ($(e.target).hasClass('active')){
		}
		else{
			var parent = $(e.target).parent();
			var guest_id = $(parent).data('value');
			var value = $(e.target).data('title');
			var children = parent.children();
			var siblings = [];

			for (var i=0;i<children.length;i++){
				if ($(children[i]).data('title') !== value){
					if ($(children[i]).hasClass('active')){
						$(children[i]).addClass('notActive');
						$(children[i]).removeClass('active');
					}
					siblings.push(children[i]);
				}
			}
			$(e.target).addClass("active");
			$(e.target).removeClass("notActive");
			if ($(e.target).data('guest') === "thanked"){
				$.post( "/thanked", {thanked: value, guest_id: guest_id} ,function(data) {
					console.log(data);
				});
			}
			else{
				$.post( "/rsvp", {rsvp: value, guest_id: guest_id} ,function(data) {
					console.log(data);
				});
			}
		}
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
						handleToggle={this.handleToggle}
					/>
				</div>
			)
		}.bind(this))
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
				<RsvpDropdown
					guest={this.props.id}
					handleToggle={this.props.handleToggle}
					rsvp={this.props.rsvp}
				/>
				<ThankedDropdown
					guest={this.props.id}
					handleToggle={this.props.handleToggle}
					thanked={this.props.thanked}
				/>
			</div>
	)
	}
});

var RsvpDropdown = React.createClass({
	render: function() {
		if (this.props.rsvp === "not coming"){
			return (
				<div className="form-group">
					<label for="rsvp"/> RSVP:
					<div className="scooch">
						<div className="input-group">
							<div data-value={this.props.guest} className="btn-group" onClick={this.props.handleToggle}>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="no">{"Not RSVP'ed"}</a>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="coming">Coming</a>
								<a className="btn btn-primary btn-sm active" data-guest="rsvp" data-title="not coming">Not Coming</a>
							</div>
							<input type="hidden" name="rsvp"/>
						</div>
					</div>
				</div>
			)
		}
		else if (this.props.rsvp === "coming"){
			return (
				<div className="form-group">
					<label for="rsvp"/> RSVP:
					<div className="scooch">
						<div className="input-group">
							<div data-value={this.props.guest} className="btn-group" onClick={this.props.handleToggle}>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="no">{"Not RSVP'ed"}</a>
								<a className="btn btn-primary btn-sm active" data-guest="rsvp" data-title="coming">Coming</a>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="not coming">Not Coming</a>
							</div>
							<input type="hidden" name="rsvp"/>
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="form-group">
					<label for="rsvp"/> RSVP:
					<div className="scooch">
						<div className="input-group">
							<div data-value={this.props.guest} className="btn-group" onClick={this.props.handleToggle}>
								<a className="btn btn-primary btn-sm active" data-guest="rsvp" data-title="no">{"Not RSVP'ed"}</a>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="coming">Coming</a>
								<a className="btn btn-primary btn-sm notActive" data-guest="rsvp" data-title="not coming">Not Coming</a>
							</div>
							<input type="hidden" name="rsvp"/>
						</div>
					</div>
				</div>
			)
		}
	}
})

var ThankedDropdown = React.createClass({
	render: function() {
		if (this.props.thanked === "yes"){
			return (
				<div className="form-group">
					<label for="thanked"/> Thanked:
					<div className="scooch">
						<div className="input-group">
							<div data-value={this.props.guest} className="btn-group" onClick={this.props.handleToggle}>
								<a className="btn btn-primary btn-sm notActive" data-guest="thanked" data-title="no">No</a>
								<a className="btn btn-primary btn-sm active" data-guest="thanked" data-title="yes">Yes</a>
							</div>
							<input type="hidden" name="thanked"/>
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="form-group">
					<label for="thanked"/> Thanked:
					<div className="scooch">
						<div className="input-group">
							<div data-value={this.props.guest} className="btn-group" onClick={this.props.handleToggle}>
								<a className="btn btn-primary btn-sm active" data-guest="thanked" data-title="no">No</a>
								<a className="btn btn-primary btn-sm notActive" data-guest="thanked" data-title="yes">Yes</a>
							</div>
							<input type="hidden" name="thanked"/>
						</div>
					</div>
				</div>
			)
		}
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
							<input onKeyUp={this.props.searchFilter} type="text" autofocus/>
						</div>
					</form>
				</div>
			</div>
		)
	}
})

ReactDOM.render( < Page / > , document.getElementById('container'));
