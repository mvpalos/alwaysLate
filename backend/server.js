const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require("./routes.js");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const secret = process.argv[2];

// console.log(bcrypt.hashSync("fish123", 10));

app.use(router);
    //connectiong to the server (sockets)
    io.on("connection", (socket) =>{
        //a user has connected
        //this will create a new user
        socket.on("adduser", (data)=>{
            //checking if there is a valid jwt and password
            jwt.verify(data.jwt, secret, (error, payload)=>{
                if(!error){
                    //if there is no error, create username
                    socket._id = payload._id;
                    socket.alias = payload.alias;

                    //adding users to the chat and into a storage array
                    const users =[];
                    //KIND OF CONFUSING
                    //connecting to th client side
                    for (let key in io.clients().connected){
                        if (users.map((value) => value._id).indexOf(io.clients().connected[key]._id) === -1){
                            users.push({
                                _id: io.clients().connected[key]._id,
                                alias: io.clients().connected[key].alias
                            });
                        }
                        if(users.length){
                            //'emit' used for brodcasting and on the chat to all SOCKET'S'
                            io.sockets.emit("updateusers", {users: users.map((value) => value.alias)});                        }
                    }
                }
                else{
                    socket.emit("kick");
                }
            })
        });
        //socket is emmiting a message throught the whole chat 
    //data, meaning whatever the message is
    socket.on("sendmessage", (data) =>{
        //before user can send a message must verify if they have a jwt token
        jwt.verify(data.jwt, secret, (error, payload) =>{
             //if there is no error, and the type of message is a tpyeof string
            if (!error){
                if (typeof data.message === "string"){
                    //This will replace all new line character in your string with "something" .
                    const message = data.message.replace(/\n/g, "").trim();

                    if (message && message.length <= 250){
                        io.sockets.emit("displaymessage", {message: message, alias: payload.alias});
                    }
                }
            }
            else{
                socket.emit("kick");
            }
        });
    });
     //disconnecting from socket.
    socket.on("disconnect", ()=>{
        const users =[];
        //find the key on the clientside that matched the value._id by goign through the array
        for(let key in io.clients().connected){
            if (users.map((value) => value._id).indexOf(io.clients().connected[key]._id) === -1){
                //once user is found, find the key that matched the alias and id
                users.push({
                    _id: io.clients().connected[key]._id,
                    alias: io.clients().connected[key].alias
                });
            }
        }//if there re still users in the array, broadcast (emit) to other users 
        if(users.length){
            socket.broadcast.emit("updateusers", {users: users.map((value)=> value.alias)});
        }
    });
});    
    



app.use(router);

http.listen(process.env.PORT || 8080, ()=>{
    console.log("server listening on port")
})