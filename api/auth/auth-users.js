const router = require('express').Router();
const User = require('../db/recipe-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {restrict} = require("../auth/auth-middleware");

router.get('api/users',async(req,res)=>{
    const users = await User.findUser()
    
    res.status(200).json({
        message:'SUCCESS',
        users
    })
})

router.post("api/login", async (req, res, next) => {
try {
    const { emailId, password } = req.body
    const user = await model.findByUserId(emailId)
    console.log(user.password, "===", password)
    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    //comparing with hashed password 
    const passwordValid = await bycrypt.compare(password, user.password)
    console.log({passwordValid})
    if (!passwordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = jwt.sign({
        userID: user.ID,
        // userRole:user.role,

    }, "keep it secret,keep it safe")
    res.cookie("token", token)
    res.json({
        message: `Welcome ${user.firstName}!`,
        data: `${user.ID}`
    })
}
catch (err) {
    next(err)
}
})

router.post("/register", async (req, res, next) => {
try {
    const { firstName, lastName, emailId, password, userType } = req.body
    console.log("emailId", emailId)
    const users = await model.findByUserId(emailId)
    console.log("users router", users)// When i get [] its working 

    if (users) {
        return res.status(409).json({
            message: "Your Email Address already registered",
        })
    }
    else {

        const newUser = await User.addUsers({
            firstName,
            lastName,
            emailId,
            password: await bcrypt.hash(password, 14),//Password harshed 14 times
            userType
        })
        console.log("New user", newUser)
        res.status(201).json(newUser)
    }

}
catch (err) {
    next(err)
}
})

router.get("/logout", async (req, res, next) => {
	try {
		// this will delete the session in the database and try to expire the cookie,
		// though it's ultimately up to the client if they delete the cookie or not.
        // but it becomes useless to them once the session is deleted server-side.
        
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})


module.exports = router;