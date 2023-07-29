export default function (socket){
   //user joins or opens the application
   
   socket.on('join', (user) => {
        socket.join(user);
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
        socket.in(user._id).emit('message received', message);
       });
   });
}