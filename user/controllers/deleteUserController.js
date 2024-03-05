const CustomError = require("../utils/Error");
const deleteUserByIdService=require("../services/deleteUserByIdService");

const deleteUserController=async(req,res,next)=>{
try{

    const {id}=req.params;

    if(!id){
        const error=CustomError.badRequest("User id is required",400)
        return next(error)
    }

    const deletedUser=await deleteUserByIdService(id);

    res.status(200).json({
        message:"User deleted successfully",
        data:deletedUser
    })

}catch(err){
    const error=CustomError.severError(err.message,err.status)
    next(error)
}
}

module.exports=deleteUserController;