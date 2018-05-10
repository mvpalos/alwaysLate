import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';


class Home extends Component {

    componentWillMount()
    {
        //checking validity of JWT (authoritization token)
        axios.post('/validtoken',({jwt:localStorage.getItem("jwt")}))
        .then((result)=>{
            //if there username or password is not sending an error,(account isnt made)
            //push the props(of all forms filled) to changing browser endpoint of '/feed'
            if(!result.data.error){
                this.props.history.push("/feed");
            }
        })
        //send error if there is existing account
        .catch((err)=>{
            console.log(err);
        })
    }

    handleSubmit = (event)=> {
        event.preventDefault(); 
        // //send usernamand password when the user clicks log in
        axios.post('/login', {
            userName: event.target.userName.value, 
            password: event.target.password.value
            })
            .then((result)=>{
                if(!result.data.error){
                    if(result.data.jwt){
                        localStorage.setItem("jwt", result.data.jwt);
                        this.props.history.push('/feed');
                    }
                }
                else {
                    console.log("Failed to login");
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        //THIS IS THE BASIC WAY YO SAVE TO LOCAL STORAGE
 
    }

    render() {
        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }
        return(
            <div className ="Register">
                <div className="container">
                
                    <h1>Login</h1>
                    
                    <form onSubmit={this.handleSubmit}>
                        <input style={submitType} name="userName" type="text" placeholder="user name" />
                        <br/>
                        <input style={submitType} name="password" type="password" placeholder="password" />
                        <br/>
                        <br/>
                        <input style={submitType} type="submit" />
                    </form>
                    <p><Link to ="/register">Register</Link></p>
                </div>
            </div>
        )
    }
}

export default Home;