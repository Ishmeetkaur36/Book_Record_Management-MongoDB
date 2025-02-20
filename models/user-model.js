const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    SubscriptionType: {
        type: String,
        required: true,
    },
    SubscriptionDate: {
        type: String,
        required: true,
    },

},
{
    timestamps : true,              //when created
}
);

module.exports = mongoose.model("User", userSchema);             //table name