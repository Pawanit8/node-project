
const pool = require('../database/db')
const fs = require('fs')
const path = require('path')
const express = require('express')
const Jwt = require('../jwt/auth')
require('dotenv').config()

class UserContoller {
     getUser =async(req,res)=> {
    
      
         try {
            const result = await pool.query(`select users.id, firstname,
                lastname,
                gender,
                mobile_no,
                language,
                img,
                address,
                dob,
                status,
                role_name from users
                inner join roles on roles.id=users.roleId`);
                
            if(result){
                res.send({code:200,data:result.rows,msg:'success'})
            }else{
                res.send({code:500,data:{},msg:'internal server error'})
            }
         } catch (error) {
             res.send({code:500,err:error,msg:'internal server error'})
         }
        
    };

    addUser=async(req,res)=>{

        try {

            const {path} = req.file;
            const {roleId,firstname,lastname,gender,mobile_no,language,address,dob}=req.body;
            const addquery=`insert into users(roleId,firstname,lastname,
            gender,mobile_no,language,img,address,dob)
            values
            ('${roleId}','${firstname}','${lastname}',
            '${gender}','${mobile_no}','${language}','${path}','${address}','${dob}') returning id ,roleId,firstname,lastname,
            gender,mobile_no,language,img,address,dob`;
            console.log("🚀 ~ UserContoller ~ addUser=async ~ addquery:", addquery)
            const result=await pool.query(addquery)
            if(result){
                const id = result?.rows[0]?.id;
                const payload = {
                    id,roleId,firstname,lastname,mobile_no,
                }
                const options = {
                    expiresIn: process.env.TOKEN_EXPIRE_TIME // Token will expire in 1 hour
                  };
                const token= await Jwt.tokenSignIn(payload,process.env.JWT_SECRET,options);
                result.rows[0]['token']=token;
                res.send({code:200,data:result?.rows[0],msg:'user data added successfully!'})
            }else{
                res.send({code:500,data:{},msg:'user data not add '})
            }


        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }
    }

    updateUser=async(req,res)=>{

    //  try {

          
            const {id,firstname,lastname,gender,mobile_no,language,address,dob}=req.body;
             const oldimagequery=`SELECT img FROM users WHERE id = '${id}'`
             const oldimagequeryRes=await pool.query(oldimagequery)
             console.log("🚀 ~ UserContoller ~ updateUser=async ~ oldimagequery:", oldimagequeryRes)
             const oldImagePath = oldimagequeryRes.rows[0].img;
            
             if (oldImagePath) {
                let filename = oldImagePath.split('/');
                console.log("🚀 ~ UserContoller ~ updateUser=async ~ filename:", filename)
                const filePath = path.join('./upload', filename[1]);
                console.log("🚀 ~ UserContoller ~ updateUser=async ~ filePath:", filePath)
               fs.unlinkSync(filePath);
             }

            const updatequery=`UPDATE users SET
            
             firstname='${firstname}',
             lastname='${lastname}',
             gender='${gender}',
             mobile_no='${mobile_no}',
             language='${language}',
             img='${img}',
             address='${address}',
             dob='${dob}',
             WHERE id ='${id}'`;
            

             const result= await pool.query(updatequery)
            

             if(result){
                res.send({code:200,data:result.rows,msg:'user updated successfully'})
             }else{
                res.send({code:500,data:{},msg:'user not updated '})
             }
            
        // } catch (err) {
        //     res.send({code:500,err:err,msg:'internal server error'})
        // }
    }


    deleteUser=async(req,res)=>{

        try {

            const {id}=req.body;
            const deletequery=`delete from users where id='${id}'`;
            const result=await pool.query(deletequery)


            if(result){
                res.send({code:200,data:result.rows,msg:'user deleted successfully'})
            }else{
                res.send({code:500,data:{},msg:'user are not deleted'})
            }
            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }

    }

}    
 module.exports = new UserContoller;
