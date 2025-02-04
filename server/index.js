
///server create

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app =  express()
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 8080

//schema

const schemaData =mongoose.Schema({
    name : String,
    email : String,
    mobile : String
},{
    timestamps : true
})


const userModel = mongoose.model("user",schemaData)

//read
//http://localhost:8080
app.get("/",async(req,res)=>{
    const data = await userModel.find()
    res.json({success : true , data : data})



})


///create data save data in mongodb
///http://localhost:8080/create
/*
{
  
  "name" : "Nitish Yadav",
  "email" : "nitish@gmail.com",
  "mobile" : 9569719689

}
*/

app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({success : true, massage : "data save successfully", data : data})
})


///update data
///http://localhost:8080/update
/*
{
  "id" "",
  "name" : "Nitish Yadav",
  "email" : "nitish@gmail.com",
  "mobile" : 9569719689

}
*/
app.put("/update",async(req,res)=>{
    console.log(req.body)
    const { id,...rest} = req.body

    console.log(rest)
    const data =  await userModel.updateOne({ _id : id},rest)
    res.send({success : true, massage : "data update successfully", data : data})
})



///delete api
///http://localhost:8080/delete/id
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, massage : "data delete successfully", data : data})
})

mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
    console.log("connect to db") 
    app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.Console.log(err))


