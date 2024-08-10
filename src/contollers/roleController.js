const pool=require('../database/db')

class roleController{

    getRole=async(req,res)=>{

        try {
            const {id,role_name,created_at,updated_at}=req.body;

            const result=await pool.query(`select * from roles`)

            if(result){
                res.send({code:200,data:result.rows,msg:'get role_table data '})
            }else{
                res.send({code:500,data:{},msg:'not fetch data from role_table'})
            }
            
        } catch (err) {

            res.send({code:500,err:err,msg:'internal server error'})
        }
    }

    // add role here //
    //Req: {role_name}//
    //res:{id,role_name,created_at,updated_at}

    addRole=async(req,res)=>{

         try {
            const {role_name}=req.body;

            const qry=`insert into roles (role_name,created_at,updated_at) values('${role_name}',now(),now())`
            
            const result=await pool.query(qry)

            
            if(result){
             res.send({code:200,data:result.rows,msg:'add role successfully'})
            }else{
                res.send({code:500,data:{},msg:'role not added'})
            }

        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
        }
    }
     
    //update role here//
    //req:{id,role_name}//
    //res:{id,new role_name,new updated_at,created_at}


    updateRole=async(req,res)=>{
        //try {
            const {id,role_name}=req.body;

            const query=`update roles set role_name='${role_name}',updated_at = now() where id='${id}'`;

            
            const result=await pool.query(query)
            console.log("🚀 ~ roleController ~ updateRole=async ~ result:", result)

            if(result){
                res.send({code:200,data:result.rows,msg:'update roletable successfully'})
            }else{
                res.send({code:500,data:{},msg:'role_table not updated'})
            }

        // } catch (err) {
        //     res.send({code:500,err:err,msg:'internal server error'})
        // }
    }
    deleteRole=async(req,res)=>{
        try {
            const {id}=req.body;
            const qry=`delete from roles where id='${id}'`;

            const result=await pool.query(qry)

            if(result){
                res.send({code:200,data:result.rows,msg:'role delete successfully'})
            }else{
                res.send({code:500,data:{},msg:'role not deleted successfully'})
            }
            
        } catch (err) {
         res.send({code:500,err:err,msg:'internal server error'})   
        }
    }

}
module.exports=new roleController;