const generateMessage=(message,username,email)=>{
    return {
        message,
        createdAt: Date.now(),
        username:username,
        email:email
    }
    }

    module.exports={
        generateMessage
    }
