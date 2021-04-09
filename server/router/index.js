const userRouter = require('express').Router()
const userModel = require('../model')


userRouter.post('/saveUser',async(req,res)=>{
    let newUser = req.body.user;
    await userModel.insertMany(newUser,(err)=>{
        err && res.status(400).json({success:false,error:err})
        res.status(201).json({success:true,data:newUser})
    })
})

userRouter.get('/getAllUsers',async(req,res)=>{
    await userModel.find((err,users)=>{
        err && res.status(400).json({success:false,error:err})
        res.status(200).json({success: true, data: users})

    })
})

userRouter.get('/getUser/:userName/:password',async(req,res)=>{
    let userName = req.params.userName
    let password = req.params.password
    await userModel.find({userName:userName,password:password},(err,user)=>{
        err && res.status(400).json({success:false,error:err})
        res.status(200).json({success: true, data: user})
    })
})

userRouter.get('/getUser/:userName',async(req,res)=>{
    let userName = req.params.userName
    await userModel.find({userName:userName},(err,user)=>{
        err && res.status(400).json({success:false,error:err})
        res.status(200).json({success: true, data: user})
    })
})

module.exports =userRouter