const { StatusCodes } = require("http-status-codes");

module.exports = (schema)=>{
    return (req , res , next)=>{
        const validationResult = schema.body.validate(req.body) ;
        if (validationResult.error){
            console.log(validationResult.error) ;
            res.status(StatusCodes.BAD_REQUEST).json({
                message : `data is not valid , ${validationResult.error}`
            })
            return ;
        }
        next() ;
    }
}