import express from "express"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import UserModel from "../models/User.model.js"

const userRouter = express.Router()

//signup
userRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, pass1 } = req.body
        const newUser = new UserModel({
            name: name,
            email: email,
            password: await bcryptjs.hash(pass1, 12)
        })
        await newUser.save()
            .then((Userdata) => {
                if (!Userdata) {
                    return res.status(200).json("Signup failed")
                }
                res.status(200).json("Successfully Signed up")
            })
    } catch (error) {
        res.status(404).json(error)
    }
})

//login

function comparepass(db_pass, user_pass) {
    const crrctpassword = bcryptjs.compareSync(db_pass, user_pass)
    return comparepass
}

userRouter.post("/login", async (req, res) => {
    try {
        const { email, pass1 } = req.body
        const existingUser = await UserModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(200).json("No Such User Exist !!")
        }
        const isPassCrt = comparepass(existingUser.password, pass1)
        console.log(isPassCrt);

        if (isPassCrt === false) {
            return res.status(200).json("Invalid credential !!")
        }
        const token = jwt.sign({ email: existingUser.email }, process.env.Secret_Key, { expiresIn: "1h" })
        res.status(200).json({ "User": existingUser, "token": token })
    } catch (error) {
        res.status(404).json(error)
    }
})
export default userRouter