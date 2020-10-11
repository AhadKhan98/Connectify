

// 

const users=[]

const addUser = ({id, username, room}) =>{
   
    room = room.trim().toLowerCase()

    if(!username || !room ){
        return{
            error:'Username and room are required'
        }
    }

    const user={id,username,room}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex((user)=>{
        return user.id === id
    })
    if (index!= -1){
        return users.splice(index,1)[0]
    }
}

const getUser = (id)=>{
    return users.find((user)=> user.id===id)
}

const getUsersInRoom=(room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=>user.room===room)
}

const numberOfUsersInRoom=(room)=>{
    room1 = room.trim().toLowerCase()
    console.log(room1,users)
    const a= users.filter((user)=>user.room===room).length
    console.log(a)
    return a
}

module.exports={
    addUser,
    getUser,
    getUsersInRoom,
    numberOfUsersInRoom,
    removeUser
}