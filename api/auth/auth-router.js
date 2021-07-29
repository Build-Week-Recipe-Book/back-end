const router = require('express').Router();
const Recipe = require('./auth-model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {restrict} = require("./auth-middleware")

 

router.get ("/users",  function(req, res, next){

    const users = [
        {
            id:1,
            first_name:'User1',
            last_name:'User',
            email:'user124@gmail.com'    },
            {
                id:2,
            first_name:'User2',
            last_name:'User',
            email:'user124@gmail.com'  
            },
            {
                id:3,
            first_name:'User3',
            last_name:'User',
            email:'user124@gmail.com'  
            }
    ]
    try {
    
        res.send(users)   }
    catch (err) {
         next(err)     }
})
router.post("/login", async (req, res, next) => {
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

            const newUser = await Recipe.addUsers({
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
router.get ("/",async(req, res, next)=>{
    const recipes = await Recipe.find()
    
    res.status(200).json({
        message:'SUCCESS',
        recipes
    })
    
})

 

router.get('/:id', (req,res,next)=>{
    const id =req.params.id;
    res.status(201).send(Recipe.id)

})

 router.post('/:id/addRecipe', async(req,res,next)=>{
    try {
        const { recipeName,ingredient,instructions} = req.body
        const id = req.params.id
        const newRecipe = await Recipe.addRecipe(req.body, id)
        console.log("New user", newRecipe)
        res.status(201).json(newRecipe)

    }
    catch (err) {
        next(err)
    }
 })

 router.put("/:id/editPotluck", async (req, res, next) => {
    try {
        const { recipeName,ingredients, instructions } = req.body
        const id = req.params.id
        const idCheck = await Recipe.findById(id)
        console.log("recipe", idCheck)
        if (!idCheck) {
            res.status(409).json({
                message: "InValid recipe Id"

            })

        }
        const editRecipe = await Recipe.updateRecipe(req.body, id)
        console.log("Edit", editRecipe)
        res.status(200).json(editRecipe)
    }
    catch (err) {
        next(err)
    }
})


router.delete("/:id", async (req, res, next) => {
    const id = req.params.id
    const deleted = await Recipe.deleteRecipe(id)
    try {
        if (deleted) {
            res.status(200).json({
                message: "recipe has been deleted"
            })
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