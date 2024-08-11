const pool=require('../database/db')
const fs = require('fs')
const path = require('path')

class userDoc_controller{

    adddocument=async(req,res)=>{
        // try {
            const{path}=req.file
            const userId = req?.data?.id;
            console.log("🚀 ~ userDoc_controller ~ adddocument=async ~ userId:", req.data)
            const{doc_type}=req.body
            const query=`insert into users_doc(userid,doc_type,img,created_at,updated_at)
            values
            ('${userId}',
            '${doc_type}',
            '${path}',
            now(),
            now());
            `;
            console.log("🚀 ~ userDoc_controller ~ adddocument=async ~ query:", query)


            const result=await pool.query(query)
            if(result){
                res.send({code:200,data:result.rows,msg:'user document added successful'})
            }else{
                res.send({code:500,data:{},msg:' user document not added successful'})
            }
            
        // } catch (err) {
        //     res.send({code:500,err:err,msg:'internal server error'})
        // }
    }



    getdocument=async(req,res)=>{
        try{
        const result=await pool.query(`select * from users_doc`)
        if(result){
            res.send({code:200,data:result.rows,msg:'get user document data'})
        }else{
            res.send({code:500,data:{},msg:'not get user document data'})
        }
      }catch(err){
        res.send({code:500,err:err,msg:'internal server error'})
      }
    }




    deletedocument=async(req,res)=>{
        try {
            const {id}=req.body
            const result=await pool.query(`delete from users_doc where id='${id}'`);

            if(result){
                res.send({code:200,data:result.rows,msg:'user document deleted'})
            }else{
                res.send({code:500,data:{},msg:'user document not deleted'})
            }
            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }

    }

    docValidate=async(req,res)=>{
        const userId = req?.data?.id;
        const {id,status}=req.body
        const query=`update users_doc set status='${status}' where id='${id}' and userId='${userId}' returning status`;
        const result=await pool.query(query)

        if(result){
                res.send({code:200,data:result.rows,msg:'update status'})
            }
            else{
                res.send({code:500,data:{},msg:'status not updated'})
        }

    }


}
module.exports=new userDoc_controller;