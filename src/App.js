import React, { Component } from 'react';

export default class App extends Component {
state = {
  data: null
};

componentDidMount() {
  this.callBackEndAPI()
    .then(res => this.setState({data: res.express}))
    .catch(err => console.log(err));
}

callBackEndAPI = async () => {
  const response = await fetch('/');
  const body = await response.json();
  if(response.status !== 200) {
    throw Error(body.message)
  }
  return body;
}
  render() {
    return (
      <div>
        <h1>Hello worlddddd</h1>
    <p>{this.state.data}</p>
      </div>
    )
  }
}
