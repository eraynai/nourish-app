import { Component } from 'react';
import React from 'react';
import {Link, Switch} from 'react-router-dom';
import './Home.css';
import Nav from '../../components/Nav/Nav';
import UserPic from '../../components/UserPic/UserPic';
import { HomeGrid, ItemA, ItemB, ItemC } from './index';


export default class Home extends Component {
  state = {
    fridge: [],
  };

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
    try{
      let jwt = localStorage.getItem('token');
      let fetchFridgeDataResponse = await fetch(`/api/${id}`,
      { method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt
        },
      })
      let newFridgeList = await fetchFridgeDataResponse.json();
      this.setState({fridge: newFridgeList})
  } catch(err){
    console.log('this is an error', err);
    }
  }
    
        
  newFridge = async () => {
    
    let jwt = localStorage.getItem('token')
    let fetchFridgeDataResponse = await fetch('/api/fridges', {method:'GET', headers: {
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt}})
    let FridgeData = await fetchFridgeDataResponse.json() // <------- convert fetch response into a js object
    console.log("get fridges", FridgeData)
    this.setState({fridge: FridgeData});
  };

  componentDidMount() {

    this.getFridge();
  };

 render() {
    return (
            // <div className="fridge">
      //     <div className="fridgeHeader">
      //         <h1>Hello, </h1>
      //     </div>
      <React.Fragment>
      <HomeGrid>
      <ItemA>  
        <UserPic />

      </ItemA> 
      <ItemB>
        <div class="card-has-background-black">
          <div class="card-content">
            <div class="content">
  
             {this.state.fridge.length ? 
                this.state.fridge.map(f =>
                     <div className> 
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
     
                ): 
                <div>
                  <h4>You currently don't have any fridges.</h4>
                </div>}

            </div>
          </div>
        </div>
        {/* <Switch> */}
        <div className="link">
        <Link className="link" exact to='/map'>Find A Fridge</Link>
        &nbsp;&nbsp;&nbsp;
        
        <Link class="link" exact to='/map'>Add A Fridge</Link>
        &nbsp;&nbsp;&nbsp;  
        {/* </Switch> */}
        </div>
        </ItemB>
        <ItemC>      
          <Nav />
        </ItemC>
        </HomeGrid>
        </React.Fragment>
      )
    }
  }