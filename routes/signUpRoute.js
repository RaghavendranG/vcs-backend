import express from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt'
import { generateAuthToken } from '../models/repoCreate.js';
const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        let newUser = await User.findOne({email:req.body.email});

        if(newUser){
            return res.status(400).send({message:"Email-id already exists"})
        }

        const salt =await bcrypt.genSalt(10);
        const plainPasword = req.body.password.toString();
        const hashedPassword = await bcrypt.hash(plainPasword,salt);
         newUser = await new User({
            userName:req.body.userName,
            email:req.body.email,
            password:hashedPassword
        }).save()

        const authToken = await generateAuthToken(newUser._id);
        res.status(200).send({AuthToken:authToken})
    } catch (error) {
        console.log(error)
        res.status(500).send();
    }
})

export const signUpRoute = router;