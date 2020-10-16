


const socket = io()

//Elements

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const sliderTemplate = document.querySelector('#sidebar-template').innerHTML

//Options
const params = new URL(location.href).searchParams;
const username = params.get('username')
const college = params.get('college');
const subject = params.get('subject')
const duration = params.get('duration')
const email = params.get('email')
const mic = params.get('mic')? params.get('mic'): 'No'
const video = params.get('video')? params.get('video'): 'No'
const notes = params.get('notes')
const room = "College:" + college + ";Subject:" + subject +  ";Duration:" + duration + ";Mic:" + mic + ";Video:" + video +";"
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
        username:message.username,
        email:message.email
    })
    $messages.insertAdjacentHTML('beforeend',html)

    // autoscroll()
})

socket.on('roomdata',({room,users})=>{
    const html = Mustache.render(sliderTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML= html

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

socket.emit('join',{username,room,email},(error)=>{
    if(error){
        alert(error)
        location.href='/users'
    }
})

// send the first message using notes
if (notes) {
  socket.emit('send',notes,(error)=>{
      $messageFormButton.removeAttribute('disabled')
      $messageFormInput.value=" "
      $messageFormInput.focus()
      if(error){
          return console.log(error)
      }
      console.log('Message delivered')
  })
}
