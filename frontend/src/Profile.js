import React, {Component} from 'react';
import axios from 'axios';

let newsFeed =[];

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            isLoading: false,
            results: []
        }
    }
   
componentDidMount(){
    console.log('hit')
    axios.get('http://localhost:8080/profile')
        .then((result)=>{
            newsFeed.push(result.data.articles);      
        });
}   

    render(){
        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }
        return(
            <div>
                <div class="container"></div>
                <h2 className="todaysStories">Today's Top Stories</h2>
                <form class="search-form" action="/search" method="GET">
                    <input style={submitType}type="text" name="searchParams" />
                    <input style={submitType}type="submit" value="submit"/>
                </form>
                {newsFeed}
            </div>
        )
    }
}

export default Profile;