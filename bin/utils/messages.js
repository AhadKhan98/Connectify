const generateMessage=(message,username)=>{
    return {
        message,
        createdAt: Date.now(),
        username:username
    }
    }
    
    module.exports={
        generateMessage
    }