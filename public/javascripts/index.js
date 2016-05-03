"use strict";

var Page = React.createClass({
   displayName: "Page",

   getInitialState: function getInitialState() {
      return {
         guests: []
      };
   },
   updateGuests: function updateGuests() {
      var idx = this.state.guests.map(function (v) {
         v.id;
      }).indexOf(guest.id);
      this.state.guests[idx] = guest;
      this.setState({
         guests: this.state.guests
      });
   },
   componentWillMount: function componentWillMount() {
      $.getJSON("/json/guests").then((function (guests) {
         this.setState({
            guests: guests
         });
      }).bind(this));
   },
   render: function render() {
      var listGuests = this.state.guests.map(function (v, i) {
         console.log(v.name);
         return React.createElement(
            "div",
            { className: "tile", key: i },
            React.createElement(Guest, {
               name: v.name,
               id: v.id,
               address: v.json['Mailing Address'],
               email: v.json['Email Address'],
               rsvp: v.json['RSVP'],
               thanked: v.json['Thanked']
            })
         );
      });
      return React.createElement(
         "div",
         null,
         React.createElement(
            "h1",
            null,
            "Guests"
         ),
         listGuests
      );
   }
});

var Guest = React.createClass({
   displayName: "Guest",

   render: function render() {
      return React.createElement(
         "div",
         null,
         React.createElement(
            "a",
            { href: "/" + this.props.id },
            React.createElement(
               "h3",
               null,
               this.props.name
            )
         ),
         React.createElement(
            "p",
            null,
            "Address: ",
            this.props.address
         ),
         React.createElement(
            "p",
            null,
            "Email: ",
            this.props.email
         ),
         React.createElement(
            "p",
            null,
            "RSVP'ed: ",
            this.props.rsvp
         ),
         React.createElement(
            "p",
            null,
            "Thanked: ",
            this.props.thanked
         )
      );
   }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('container'));