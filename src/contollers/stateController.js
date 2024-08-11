const pool = require('../database/db')
class stateController{
    getState=async(req,res)=>{
        try {
            const result=await pool.query(`select * from states`)
            if(result){
                res.send({code:200,data:result.rows,msg:'get data successfully'})
            }
            else{
                res.send({code:500,data:{},msg:'internal server error'})
            }

            
        } catch (err) {
          res.send({code:500,err:err,msg:'internal server error'})  
        }

    }


    addState=async(req,res)=>{
        try {
            const {name}=req.body;
            const query=`insert into states (name,created_at) values('${name}',now())`;
            const result=await pool.query(query)
            console.log("🚀 ~ stateController ~ addState=async ~ result:", result)
            if(result){
                res.send({code:200,data:result.rows,msg:'state add successfully'})
                }
            else{
                res.send({code:500,data:{},msg:'state not added'})
                }
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})  
            }  

    }


    updateState=async(req,res)=>{
       try{
        const {id,name}=req.body;
        const updateQuery = ` UPDATE states SET name = '${name}' WHERE id = '${id}'
                    returning name`;
        const result=await pool.query(updateQuery)
        if(result){
            res.send({code:200,data:result.rows,msg:'state update successful'})

        }
        else{
            res.send({code:500,data:{},msg:'state not updated'})  
        }

        }catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})  
            } 
   
    }


    deleteState = async(req,res)=>{
     //   try{
        const {id} =req.body;
        const query =`DELETE from states where id='${id}'`;
        const result =await pool.query(query)
        if(result){
            res.send({code:200,data:result.rows,msg:'state is deleted'})
        }else{
            res.send({code:500,data:{},msg:'state not deleted'})  
        }
    // }catch(err) {
    //     res.send({code:500,err:err,msg:'internal server error'})  
    //     } 
    }


}
module.exports = new stateController;