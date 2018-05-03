import React, { Component } from 'react';
import axios from 'axios';

class PrivatePage extends Component{
    constructor(){
        super();
        this.state = {data:null,loading:true, auth:false}
    }
    //this function is called as soon as the component is loaded on page
    //makes a request to our private data endpoint and once it recives it
    //the data updates the loading state and shows the data on the page
    componentDidMount(){
        //token check
        if(localStorage.authToken !== undefined && localStorage.authToken !== null){
            axios.get('http://localhost:3005/privatedata')
            .then((res)=>{
                //if token is valid show page and data 
                if(res.status === 200){
                    this.setState({
                        loading:false,
                        auth:true,
                        data: res.data
                    })
                }
                else{
                    //location.href = "http://localhost:3000";
                }
            });
            
        }
    }
    //this render function will show loading or
    //the text only once the componentDidMount function is request
    render(){
        if(this.state.loading){
            return <div>loading..</div>
        }
        else{
            return(
                <div>
                    <h1>Private Page Data</h1>
                <p>{this.state.data}</p>
                </div>
            );
        }
    }
}
export default PrivatePage;