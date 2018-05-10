import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Cloudy from "./Cloudy";
import Profile from "./Profile";
import Chat from "./Chat";

class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {
        userName : "",
        currentTime: moment().format('LT'),
        currentDate: moment().format('dddd')+" "+ moment().format('LL'),
        currentTimePiece: {
        hour: moment().format('h'),
        colen: true,
        minute: moment().format('mm'),
        AMPM: moment().format('A')
        }
        };
        this.clock();
this.logoutHandler = this.logoutHandler.bind(this);
    }

componentDidMount(){
        axios.post("/validtoken",{
            jwt: localStorage.getItem("jwt")
        })
        .then(result=>{
            if(result.data.error){
                this.props.history.push('/');
            }
            else
            {
                this.setState({
                    userName: result.data.alias
                });
            }
        })
}   

logoutHandler()
{
    localStorage.removeItem("jwt");
    this.props.history.push("/");
}

//DISPLAY CLOCK
clock(){
    setTimeout(()=>{
			this.setState({
		        currentTime: moment().format('LT'),
                currentTimePiece: {
                hour: moment().format('h'),
                colen: !this.state.currentTimePiece.colen,
                minute: moment().format('mm'),
                AMPM: moment().format('A')
                                    },
			})
			this.clock();
		}, 500)
  }

    render() {
        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }

        let header ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '40px'
        }
        return(
            <div>
             <h2 style = {header}>Hello, {this.state.userName}!</h2>
             <br/>
             <button style={submitType} onClick={this.logoutHandler} type="button">Logout</button>
             <br/>
             <br/>
                <nav>
                <Link className= "header" to ="/feed/profile">Profile</Link>
                <Link className= "header" to ="/feed/coudy">Location</Link>
                <Link className= "header" to ="/feed/chat">Chat</Link>
                </nav>
            <div className='timeWrapper'>
            {this.state.currentDate}
            <br/>
            <span className='currentTime'>{(this.state.currentTimePiece.hour)}</span><span style={(this.state.currentTimePiece.colen)?{}:{visibility:"hidden"}} className='currentTimeColen'>:</span><span className='currentTime'>{(this.state.currentTimePiece.minute)}</span><span className='timeOfDay'>{(this.state.currentTimePiece.AMPM)}</span>
              </div>

            <Switch>
                <Route path="/feed/profile" render={()=><Profile />} /> 
                <Route path="/feed/coudy" render={()=><Cloudy />} />
                <Route path="/feed/chat" render={()=><Chat />} />
            </Switch>
            </div>
        )
    }
}

export default Feed;