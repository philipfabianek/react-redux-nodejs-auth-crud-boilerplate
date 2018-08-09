import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memorySchema = new Schema({
    userId: String,
    description: String,
    createdAt: Number,
    note: String
});

const Memory = mongoose.model("memory", memorySchema);

export default Memory;
