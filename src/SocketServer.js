let onlineUsers = [];

export default function (socket, io){
   //user joins or opens the application
   
   socket.on('join', (user) => {
        socket.join(user);
        //add joined user to online users
        if(!onlineUsers.some((u) => u.userId === user)){
            console.log(`user ${user} is now online--------------------`)
            onlineUsers.push({userId: user, socketId: socket.id})
        }
        //semd online users to front
        io.emit("get-online-users", onlineUsers)
   });

   //socket disconnect
   socket.on('disconect', ()=> {
    onlineUsers=onlineUsers.filter((user) => user.socketId !== socket.id)
    console.log(`use disconect --------------------`)
    io.emit("get-online-users", onlineUsers)
   });

   //join a conversation roon
   socket.on('join conversation', (conversation)=> {
    socket.join(conversation);
   });

   //send and receive message
   socket.on("send message", (message) => {
       console.log("new message receiver -------> ", message)
       let conversation = message.conversation;
       if(!conversation.user) return;
       conversation.users.forEach((user) =>{
        if(user._id === message.sender._id) return;
        socket.in(user._id).emit('receive message', message);
       });
   });

   //typing
   socket.on('typing', (conversation) => {
     socket.in(conversation).emit("typing", conversation)
   });
   socket.on('stop typing', (conversation) => {
     socket.in(conversation).emit("stop typing")
   });
}