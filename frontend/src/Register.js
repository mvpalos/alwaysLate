import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



class Register extends Component {
    constructor(props){
        super(props);
        //check to see if the forms are filled
        this.state ={
            error:[]
        };
        this.registerHandler = this.registerHandler.bind(this);
        this.removeErrorHandler = this.removeErrorHandler.bind(this);
    }

componentWillMount(){
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

registerHandler(e){
    e.preventDefault();

    if (e.target.username && e.target.password)
    {
        axios.post("/register", {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then((results) =>
        {
            if (!results.data.error)
            {
                if (results.data.jwt)
                {
                    localStorage.setItem("jwt", results.data.jwt);
                    this.props.history.push("/feed");
                }
            }
            else
            {
                this.setState({
                    error: results.data.reason
                });
            }
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }
}

removeErrorHandler(){
    this.setState({
        error: []
    })
}

    render() {
        

        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }
        return(
            <div>
            <h1>Register</h1>
            {this.state.error}
            <form onSubmit={this.registerHandler}>
                <input style={submitType} id="username" name="username" type="text" placeholder="user name" />
                <br/>
                <input style={submitType}id="password" name="password" type="password" placeholder="password" />
                <br/>
                <br/>
                <button id="submitButton" style={submitType} type="submit"> Submit </button>
             </form>
             <p><Link to ="/">back</Link></p>
            
            </div>
        )
    }   
}    
    


export default Register;