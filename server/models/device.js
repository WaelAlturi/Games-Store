import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    deviceName: String,
    price: Number,
    reviews: [
        {
            createdAt: Date,
            title: String,
            review: String
        }
    ],
    gallery: [
        {
            imageSource: String,
            imageDesc: String
        }
    ]
})

export default mongoose.model('Device', deviceSchema);