import React from "react";
import axios from "axios";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //without refreshing page, the user and messages wil
            //be th only things that update
            users: [],
            messages: []
        };
        this.sendMessageSubmitHandler = this.sendMessageSubmitHandler.bind(this);
        this.sendMessageEnterHandler = this.sendMessageEnterHandler.bind(this);
    }

    componentDidMount(){
        //check to see if there is a valid jwt token
        axios.post("http://localhost:8080/validtoken", {
            jwt: localStorage.getItem("jwt")
        })
        .then((results) =>{
            if (results.data.error){
                console.log("error: no valid jwt")
            }
            else{
                this.socket = io("http://localhost:8080");
                if (this.socket){
                    this.socket.emit("adduser", {jwt: localStorage.getItem("jwt")});
                    this.socket.on("updateusers", (data) =>{
                        this.setState({
                            users: data.users
                        });
                    });
                this.socket.on("displaymessage", (data) =>{
                        let isScrolledDown = false;
                        const chatContainer = document.getElementById("chat_container");
                    if (chatContainer.clientHeight + Math.ceil(chatContainer.scrollTop) >= chatContainer.scrollHeight)
                        {
                            isScrolledDown = true;
                        }

                        const messages = this.state.messages.map((value) => value);

                        messages.push({
                            message: data.message,
                            alias: data.alias
                        });

                        this.setState({
                            messages: messages
                        });

                        if (isScrolledDown)
                        {
                            chatContainer.scrollTop = chatContainer.scrollHeight;
                        }
                    });

                    this.socket.on("reconnect", () =>
                    {
                        this.socket.emit("adduser", {jwt: localStorage.getItem("jwt")});
                    });

                    this.socket.on("kick", () =>
                    {
                        localStorage.removeItem("jwt");
                        this.props.history.push("/login");
                    });
                }
            }
        })
        .catch((error) =>
        {
            console.log(error);
        });
    }

    componentWillUnmount()
    {
        if (this.socket)
        {
            this.socket.disconnect();
        }
    }


    sendMessageSubmitHandler(event)
    {
        event.preventDefault();

        if (event.target.message && this.socket)
        {
            this.socket.emit("sendmessage", {message: event.target.message.value, jwt: localStorage.getItem("jwt")});
            document.getElementById("message").value = "";
        }
    }

    sendMessageEnterHandler(event)
    {
        if (event.target && this.socket && event.keyCode === 13)
        {
            this.socket.emit("sendmessage", {message: event.target.value, jwt: localStorage.getItem("jwt")});
            document.getElementById("message").value = "";
        }
    }

    render()
    {
        let submitType ={
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '15px'
        }
        return (
            <div className="Chat">
            <h1 className ="todaysStories">Dailey News Chat</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div style={{marginTop: "10px", marginBottom: "35px"}}>
                                <div className="chatBox">
                                    <div className={{padding: "20px 10px 10px 10px"}}>
                                        <button style={submitType} data-toggle="modal" data-target="#users_modal">Users <span className="badge badge-danger">{this.state.users.length}</span></button>
                                    </div>
                                    <div id="chat-box" className = "talkToTalk" style={{height: "250px", overflow: "auto", margin: "10px", border: "solid white 1px", borderRadius: "5px", backgroundColor: "azure"}}>
                                        {this.state.messages.map((value, index) => <div key={index} style={{margin: "15px", padding: "10px", borderBottom: "solid gray 1px", wordWrap: "break-word"}}><h4>{value.alias}</h4><p style={{marginBottom: "0px"}}>{value.message}</p></div>)}
                                    </div>
                                    <div className="chatContainer" style={{padding: "10px"}}>
                                        <form onSubmit={this.sendMessageSubmitHandler}>
                                            <textarea onKeyUp={this.sendMessageEnterHandler} id="message" className="textContainer" name="message" placeholder="Send a message." style={{resize: "none"}}></textarea>
                                            <button style = {submitType}>Send</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="users_modal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header">
                                <h1 className="userBox">Users</h1>
                            </div>
                            <div className="modal-body" style={{maxHeight: "250px", overflow: "auto"}}>
                                {this.state.users.map((value, index) => <p key={index} style={{margin: "25px"}}>{value}</p>)}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
