import React, {Component} from 'react';
import axios from 'axios';

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            value: '',
            results: []
        }
    }
componentWillMount(){
    console.log('hit')
    axios.get('http://localhost:8080/profile')
        .then((result)=>{
            this.newsFeed = result.data.articles;
        })
        .catch((error)=>{
            console.log(error)
        })
}  


    render(){
        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }

        let newsFeedjsx = [];

        if (this.newsFeed)
        {
            newsFeedjsx = this.newsFeed.map((value) => value);
        }

        return(
            <div>
                 <div class="Newscontainer"></div>
                <h2 className="todaysStories">Today's Top Stories</h2>
                <div className = "newsText">
                {newsFeedjsx.map((value) => 
                <div className="row">
                <div className="col-sm-4"><img src={value.urlToImage}></img></div>
                <div className="col-sm-8"><h>{value.title}</h><p>{value.description}</p></div>
                </div>)}

                {/*

                 <div class="container"></div>
                <h2 className="todaysStories">Today's Top Stories</h2>
                
                {newsFeedjsx.map((value) => 
                <div className="newsText">
                <img src={value.urlToImage}></img>
                <h>{value.title}</h>
                <p>{value.description}</p>
                </div>)}
                
                */}
                </div>
            </div>
        )
    }
}

export default Profile;