import { Component } from 'react';
import React from 'react';
import './InfoPage.css';
import { InfoGrid } from './index';
import Nav from '../../components/Nav/Nav';

export default class InfoPage extends React.Component {
    render(){
        return(
            <div>
                
            <InfoGrid>
            <h1>Nourish</h1>

            </InfoGrid>    
            
            <h2>About The Application</h2>
                <br/>
                
            <h4>Nourish is an application where you can donate food, find food and 
                create your own community fridge. Let's help remove hunger together.
            </h4>
                <br/>
                <br/>
            <h2>How It Works</h2>
            
            <h4>Need a fridge? Search our database for a community fridge near you using
                our maps tool. Only fridges that have food will be included.
            </h4>  
                <br/>  
            <h4>Have extra food or items that can't be sold due to a close expiry date?
                Find an existing fridge in our database nearby.
            </h4>
                <br/>
            <h4>Want to build your own fridge? Place a fridge on our map and creating a listing.
                Monitor your listing and keep the fridge up to date. No food for now? Just use 
                the hide toggle to turn off your fridge until there is food. You can't maintain 
                the fridge or it is just a pop up for now? Delete the fridge from our database
                with no hassle.
            </h4>
                <br/>
            <h4>Need some help building a community fridge? Check out this link that shows you a 
                tutorial of how.
            </h4>    
            <Nav />
            </div>
            
     
           

        )
    
    };
}