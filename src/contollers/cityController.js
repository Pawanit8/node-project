const pool =require('../database/db');

class Citiescontroller{
    getCity=async(req,res)=>{
       // try {
            const result=await pool.query(`select city.id,city.name as city_name,stateId,state.name  from cities inner join state on state.id=cities.stateId`);
            if(result){
                console.log("🚀 ~ Citycontroller ~ getCity=async ~ result:", result)
                
                res.send({code:200,data:result.rows,msg:'get data successfully'})
            }else{
                res.send({code:500,data:{},msg:'did not get data' })
            }
            
        // } catch (err) {
        //     res.send({code:500,err:err,msg:'internal server error'})
            
        // }
    }

    addCity=async(req,res)=>{
      //  try {
            const {stateId,name} =req.body;
            const query=`insert into cities(stateId,name,created_at)values ('${stateId}','${name}',now())`;
            const result=await pool.query(query)
            if(result){
                res.send({code:200,data:result.rows,msg:'city added successfully'})
            }else{
                res.send({code:500,data:{},msg:'city not added'})
            }
            
        // } catch (err) {
        //     res.send({code:500,err:err,msg:'internal server error'})
        // }
    }
    updateCity=async(req,res)=>{
        try {
            const {id,name}=req.body;
            const qry=`update cities set name ='${name}' where id='${id}'`;
            const result=await pool.query(qry)
            if(result){
                res.send({code:200,data:result.rows,msg:'city updated successfully'})
            }else{
                res.send({code:500,data:{},msg:'city not update'})
            }


            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }
    }
    deleteCity=async(req,res)=>{
        try {
            const {id}=req.body;
            const deleteqry=`delete from cities where id='${id}' `;
            const result=await pool.query(deleteqry)
            if(result){
                res.send({code:200,data:result.rows,msg:'city deleted successfully'})
            }else{
                res.send({code:500,data:{},msg:'city not deleted'})
            }
            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }
    }



}
module.exports=new Citiescontroller;