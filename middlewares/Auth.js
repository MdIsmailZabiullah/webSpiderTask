import jwt from 'jsonwebtoken'

const CheakAuth = (req, res, next) => {
    try {
        jwt.verify(req.headers.token, process.env.Secret_Key)
        next()
    } catch (error) {
        res.status(200).json("Un Authrized")
    }
}

export default CheakAuth