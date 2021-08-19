import { Component } from 'react';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import Nav from '../../components/Nav/Nav';

export default class Home extends Component {
  state = {
    fridge: [],
  }

  getFridge = async () => {
    let jwt = localStorage.getItem('token')
    let fetchFridgeDataResponse = await fetch('/api/fridge/' + this.props.user._id, {headers: {'Authorization': 'Bearer ' + jwt}})
    if (!fetchFridgeDataResponse.ok) throw new Error("Couldn't fetch fridge!")
    let FridgeData = await fetchFridgeDataResponse.json() // <------- convert fetch response into a js object
    console.log("get fridges", FridgeData)
    this.setState({fridge: FridgeData});
  };
  //getOne = asyync (incoming_thought_id) =>
  //thoughts/the id
  async componentDidMount() {
    try {
     await this.getFridge();
    } catch (err) {
      console.error('ERROR:', err) // <-- log if error
    }
  };
  render() {
    return (
     <div className="fridge">
         <div className="fridgeHeader">
             <h1>Hello, </h1>
         </div>
        <h1 className="fridge-title">Your Fridge Details</h1>
          <div className="user-fridge">
              {this.state.fridge.map(f =>
              		<div>
                      {f.name}
                    <br/>
                    {f.lat}
                    <br/>
                    {f.lng}
                    <br/>
                    {f.address}
                    <br />
                    {f.time}
                    <br />
                    {f.date}
                    <br/>
                    {f.description}
                    <br/>
                    {f.imageUrl}
                    </div>
              )}
          </div>
          <button id="btn" className="btn-sm">Find A Fridge</button>
          <button id="btn" className="btn-sm">Add A Fridge</button>
          <Nav />
     </div>
    )
  }
}