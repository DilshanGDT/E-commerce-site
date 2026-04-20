import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    _id:{ type : String, required: true }, // Use Clerk's user ID as the _id
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} }, 

}, { minimize: false })

const User = mongoose.models.user || mongoose.model('User', userSchema)

export default User