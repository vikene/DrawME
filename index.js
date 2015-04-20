var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){

        res.sendFile(__dirname+"/index.html") //static file serve

})

io.on('connection',function(socket){

    console.log("I got a collabrative collection");
    socket.on("drawing_start",function(msg){
    
        console.log(msg);
    
    })
    socket.on("drawing_onprocess",function(msg){
    
        io.emit("paintit",msg);
    })

})
http.listen(5000,function(err,res){
console.log("Server Started !!");

})
