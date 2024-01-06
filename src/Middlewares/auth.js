const jsonwebtoken=require("jsonwebtoken")
const SECRET_KEY = "LeaseEase"
const auth = function (req, res, next) {
    try {
        let token = req.cookies?.uid;
        if (token) {
            let user=jsonwebtoken.verify(token,SECRET_KEY);
            req.userID=user.id
        }
        else {
            res.status(401).json({ message: "Unauthorized user" })

        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized user" })
    }
}

module.exports=auth;