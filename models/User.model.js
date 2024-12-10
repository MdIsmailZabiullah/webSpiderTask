import mongoose from "mongoose"

const User = mongoose.Schema({
    name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String }
})

export default mongoose.model("userSchema", User, "User")