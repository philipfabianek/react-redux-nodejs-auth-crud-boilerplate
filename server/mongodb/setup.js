import mongoose from "mongoose";
import keys from "./../config/keys";

mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true
}, () => {
    console.log("Connected to MongoDB");
});
