const pool=require('../database/db')

class OtpController{

    genrateOtp=async(req,res)=>{
        try {
            const userId = req?.data?.id;
            const{mobile_no}=req.body
            const qry = `select otp_count, max_attempt from users 
                            inner join users_otps on users_otps.userId = users.id
                                where mobile_no='${mobile_no}' and users.id='${userId}'`;
        
            const result = await pool.query(qry);
            const otp = this.otp();
            if(result.rowCount<1){
                const insertQry = `insert into users_otps 
                (userId,otp,max_attempt,otp_count)
                values('${userId}','${otp}','3','1') returning id,otp,otp_count,userId;
                `;
                const result = await pool.query(insertQry);
                if(!result){
                    return res.send({code:500,msg:'otp not inserted'})
                }
                res.send({code:200,data:result.rows,msg:'otp generated successfuly !!'})
                // data save;
                
            }else{
                let otpCount = parseInt(result?.rows[0]?.otp_count);
                const maxOtpCount = parseInt(result.rows[0].max_attempt);
                if(maxOtpCount>otpCount){
                    const updateQry = `update users_otps set otp='${otp}', otp_count='${++otpCount}' where userId='${userId}' returning id,userId,otp,otp_count,max_attempt`;
                    const result = await pool.query(updateQry);
                    res.send({code:200,data:result.rows[0],msg:'otp generated successfuly !!'})
                }else{
                    return res.send({code:500,msg:'otp limit execeded'})
                }

            }

            
        } catch (err) {
            res.send({code:500,err:err,msg:'internal server error'})
            
        }
    }

otp = ()=>{
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
}

otpverfication=async(req,res)=>{


    const {mobile_no,otp}=req.body;
    const userId = req?.data?.id;
    console.log("🚀 ~ OtpController ~ otpverfication=async ~ userId:", userId)
    const qry=`select mobile_no,otp from users inner join users_otps on users_otps.userId=users.id where mobile_no='${mobile_no}' and userId='${userId}'`;
    const result=await pool.query(qry)
   
    
    //database otp fetching into dbotp

    const dbOtp = result.rows[0]?.otp;
    console.log("🚀 ~ OtpController ~ otpverfication=async ~ dbOtp :", dbOtp )
    if(dbOtp==otp){
        
        //updating query when bdotp is equal to user otp
        //result otp_count=0,otp=''

        const updatequery=`update users_otps set otp='',otp_count=0 where userId='${userId}'`;
        console.log("🚀 ~ OtpController ~ otpverfication=async ~ updatequery:", updatequery)
        const re=await pool.query(updatequery)
        console.log("🚀 ~ OtpController ~ otpverfication=async ~ esu:", re)
        res.send({code:200,data:re.rows,msg:'otp validated successfully'});
    }
    else{
        res.send({code:500,data:{},msg:'otp invalid'});
    }
}




}

module.exports = new OtpController;