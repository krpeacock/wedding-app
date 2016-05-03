var Page = React.createClass({
	getInitialState: function () {
		return {
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
	componentWillMount: function () {
		$.getJSON("/json/guests").then(function (guests) {
			this.setState({
				guests
			})
		}.bind(this))
	},
	render: function () {
		var listGuests = this.state.guests.map(function(v,i){
			console.log(v.name)
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
				<h1>Guests</h1>
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

ReactDOM.render( < Page / > , document.getElementById('container'));
