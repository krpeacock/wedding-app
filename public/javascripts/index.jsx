var Page = React.createClass({
  getInitialState: function(){
    return {
      name: "Kyle",
      json: {
        email: "kylpeacock@gmail.com",
        address: "Home"
      }
    }
  },
  render: function(){
    return (
      <div>
        <Guest 
          name={this.state.name}
          email={this.state.json.email}
          address={this.state.json.address}
        />
      </div>
    );
  }
});

var Guest = React.createClass({
  render: function(){
    return <div>
      <h1>{this.props.name}</h1>
      <p>{this.props.email}</p>
      <p>{this.props.address}</p>
    </div>
  }
});

ReactDOM.render(<Page />, document.getElementById('container'));