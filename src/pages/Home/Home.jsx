import { Component } from 'react';
import React from 'react';
import {Link, Switch} from 'react-router-dom';
import './Home.css';
import Nav from '../../components/Nav/Nav';

export default class Home extends Component {
  state = {
    fridge: [],
  }

  getFridge = async () => {
    
    let jwt = localStorage.getItem('token')
    let fetchFridgeDataResponse = await fetch('/api', {method:'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}})
    if (!fetchFridgeDataResponse.ok) throw new Error("Couldn't fetch fridge!")
    let FridgeData = await fetchFridgeDataResponse.json() // <------- convert fetch response into a js object
    console.log("get fridges", FridgeData)
    this.setState({fridge: FridgeData});
  };

  getOneFridge = async (id) => {
    
    try{let jwt=localStorage.getItem('token')
        let fetchFridgeDataResponse= await fetch(`/api/${id}`,
        {method: 'DELETE', headers: {
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt
        }})
        let newFridgeList= await fetchFridgeDataResponse.json();
        this.setState({fridge: newFridgeList})
        } catch (error) {
            console.log('this is an error')
        }
    }
    };
        
  newFridge = async () => {
    
    let jwt = localStorage.getItem('token')
    let fetchFridgeDataResponse = await fetch('/api/fridges', {method:'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}})
    let FridgeData = await fetchFridgeDataResponse.json() // <------- convert fetch response into a js object
    console.log("get fridges", FridgeData)
    this.setState({fridge: FridgeData});
  };

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
              {this.state.fridge.length? 
                <div>
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
                    // <button>Delete</button>

                )} 
                </div>
                
                : 

                <h4>You currently don't have any fridges.</h4>
            }
          </div>  
          <Switch>
            <Link class="link" exact to='/map'>Find A Fridge</Link>
            &nbsp;&nbsp;&nbsp;
            <br/>
            <Link class="link" exact to='/map'>Add A Fridge</Link>
            &nbsp;&nbsp;&nbsp;  
          </Switch>
          <Nav />
     </div>
   
    )
  }
_