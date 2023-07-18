import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js"

export const doesConversationExist = async (sender_id, receiver_id) => {
    let convos = await ConversationModel.find({
        isGroup: false,
        $and: [
            {users: {$elemMatch:{$eq:sender_id}}},
            {users: {$elemMatch:{$eq:receiver_id}}},
        ]
    })
    .populate("users",'-password')
    .populate("latestMessage");

    if(!convos) throw createHttpError.BadRequest("Oops... someting went wrong!")

    convos = await UserModel.populate(convos, {
        path: "latestMessage.sender",
        select: "name email picture status",
    });

    return convos[0]
}

export const createConversation = async(data) => {
    console.log("teste1")
    const newConvo = await ConversationModel.create(data);
    console.log("teste2")
    if(!newConvo)
        throw createHttpError.BadGateway('Oops..Something went wrong!');
    
    return newConvo;
}

export const populateConversation = async (id, fieldToPopulate, fieldsToRemove) => {
    const populatedConvo = await ConversationModel.findOne({_id: id})
        .populate(fieldToPopulate, fieldsToRemove);
    if(!populatedConvo)
        throw createHttpError.BadGateway('Oops..Something went wrong!');
    
    return populatedConvo;
}

export const getUserConversations=async(user_id) =>{
    let conversations;
    await ConversationModel.find({
        users:{$elemMatch: {$eq: user_id}},
    })
    .populate('users', '-password')
    .populate('admin', '-password')
    .populate('latestMessage')
    .sort({updatedA:-1})
    .then(async (results) => {
        results= await UserModel.populate(results, {
            path: "latestMessage.sender",
            select: "name email picture status",
        });
        conversations=results;
    }).catch((err) => {
        throw createHttpError.BadGateway('Oops..Something went wrong!');
    });
    return conversations;
};


