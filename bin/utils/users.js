

//

const users=[]

const addUser = ({id, username, room,email}) =>{

    room = room.trim().toLowerCase()

    if(!username || !room ){
        return{
            error:'Username and room are required'
        }
    }

    const user={id,username,room,email}
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

const getRoomDescription=(room)=>{
    console.log("ROOM IS " + room)
    let re = /college:(.*?);subject:(.*?);duration:(.*?);mic:(.*?);video:(.*?);/
    var description = room.match(re)
    var a = {
      college: description[1],
      subject: description[2],
      duration: description[3],
      mic: description[4],
      video: description[5]
    }
    return a
}

module.exports={
    addUser,
    getUser,
    getUsersInRoom,
    getRoomDescription,
    numberOfUsersInRoom,
    removeUser
}
