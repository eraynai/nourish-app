import { Component } from 'react';
import React from 'react';
import { ExternalLink } from 'react-external-link';
import './InfoPage.css';
import { InfoGrid, ItemA, ItemB, ItemC } from './index';
import Nav from '../../components/Nav/Nav';

export default class InfoPage extends React.Component {
    render(){
        return(
                           
            <InfoGrid>

            <ItemA>
            <h1>Nourish</h1>
            </ItemA>
               
            <ItemB>
            <h3>About The Application</h3>
                               
            <h6>Nourish is an application where you can donate food, find food and 
                create your own community fridge. Let's help remove hunger together.
            </h6>
             <br/>   
            <h3>How It Works</h3>
            
            <p>Need a fridge? Search our database for a community fridge near you using
                our maps tool. Only fridges that have food will be included.
            </p>  
            
            <p>Have extra food or items that can't be sold due to a close expiry date?
                Find an existing fridge in our database nearby.
            </p>
              
            <p>Want to build your own fridge? Place a fridge on our map and creating a listing.
                Monitor your listing and keep the fridge up to date. 
{/*                 
                No food for now? Just use 
                the hide toggle to turn off your fridge until there is food. You can't maintain 
                the fridge or it is just a pop up for now? Delete the fridge from our database
                with no hassle. */}
            </p>

            <p>Need some help building a community fridge? Check out this
                <ExternalLink href="https://youtu.be/y0M4DjVzX_c">
                    <span> video </span>
                </ExternalLink>
                that shows you a tutorial of how.
            </p>
            </ItemB>

            <ItemC>    
                <Nav />
            </ItemC>
            
            </InfoGrid>            
     
           

        )
    
    };
}