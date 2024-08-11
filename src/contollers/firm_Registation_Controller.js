const { query } = require('express');
const pool=require('../database/db')


class firm_Registation{

    addFirm=async(req,res)=>{
        try {
            const{userId,firm_name,Gst_number,firm_open_date,firm_Address}=req.body;

            const addFirmQuery=`insert into firms_reg 
            (userId,firm_name,Gst_number,firm_open_date,firm_Address,created_at,updated_at)
            values
            ('${userId}','${firm_name}','${Gst_number}','${firm_open_date}','${firm_Address}',now(),now())
            ;
            `;
        

            const result=await pool.query(addFirmQuery)
            
            if(result){
                res.send({code:200,data:result.rows,msg:'firm registation data added successfully'})
            }else{
                res.send({code:500,data:{},msg:'firm registation data not added'})
            }
            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }
    }


getFirm=async(req,res)=>{

        try{

       const result=await pool.query(`select * from firms_reg`) 

       if(result){
        res.send({code:200,data:result.rows,msg:'get firm data successful '})
    } else{
        res.send({code:500,data:{},msg:'not get firm registation data '})
    }
    
     } catch (err) {
    res.send({code:500,err:err,msg:'internal server error'})
   }

}




updateFirm=async(req,res)=>{
    try{

    const {userId,firm_name,Gst_number,firm_open_date,firm_Address}=req.body
   const updatequery=`update firms_reg set
    firm_name='${firm_name}',
    Gst_number='${Gst_number}',
    firm_open_date='${firm_open_date}',
    firm_Address='${firm_Address}',
    updated_at=now()
    where userId='${userId}'
`;

const result=await pool.query(updatequery)

if(result){
    res.send({code:200,data:result.rows,msg:'update firm data successful '})
} else{
    res.send({code:500,data:{},msg:'not update firm registation data '})
}
    }catch(err){
        res.send({code:500,err:err,msg:'internal server error'})
    }

}


deleteFirm=async(req,res)=>{
    try {

        const{id}=req.body
        const result=await pool.query(`DELETE from firms_reg where id='${id}`)
        if(result){
            res.send({code:200,data:result.rows,msg:'firm is deleted'})
        }else{
            res.send({code:500,data:{},msg:'firm not deleted'})  
        }
        
    } catch (err) {
        res.send({code:500,err:err,msg:'internal server error'})
    }
}


}

module.exports=new firm_Registation;