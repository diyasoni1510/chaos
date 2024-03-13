import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    users : Array,
    messages:[{message:String,sender:String}],
    craeaedAt : { type: Date, default: Date.now }
}) 

const Chat = mongoose.models.chat || mongoose.model("chat",chatSchema)

export default Chat