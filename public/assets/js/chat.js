


const socket = io()

//Elements

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML

//Options
const params = new URL(location.href).searchParams;
const username = params.get('username')
const college = params.get('college');
const subject = params.get('subject')
const mic = params.get('mic')? params.get('mic'): 'No'
const video = params.get('video')? params.get('video'): 'No'
const room = college+subject+mic+video
console.log(room)
// const autoscroll=()=>{
//     const $newMessage =$messages.lastElementChild
//     const newMessageHeight= $newMessage.offsetHeight
//     const newMessageStyles = getComputedStyle($newMessage)
//     const newMessageMargin = parseInt(newMessageStyles.marginBottom)
// }
socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate,{
        message:message.message,
        createdAt: moment(message.createdAt).format('h:mm:ss a'),
        username:message.username
    })
    $messages.insertAdjacentHTML('beforeend',html)
    
    // autoscroll()
})

document.querySelector('#message-form').addEventListener('submit',(e)=>{
e.preventDefault()
$messageFormButton.setAttribute('disabled','disabled')
const message = document.querySelector('input').value
socket.emit('send',message,(error)=>{
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value=" "
    $messageFormInput.focus()
    if(error){
        return console.log(error)
    }
    console.log('Message delivered')
})
})

socket.emit('join',{username,room},(error)=>{
    if(error){
        alert(error)
        location.href='/users'
    }
})