const getAllProductsService=require("../services/getAllProductsService")
const CustomError=require("../utils/Error")

const getAllProductsController=async (req,res,next)=>{
    try{
        const products=await getAllProductsService()
        res.status(200).json({message:"Success",products})
    }catch(err){
        const error=CustomError.severError(err,err.status)
        next(error)
    }
}


module.exports=getAllProductsController