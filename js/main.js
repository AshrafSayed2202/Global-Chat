window.onload = function() {
const firebaseConfig = {
    apiKey: "AIzaSyCjxJ4TxSjngUdYHuZqEjvlomQVN2OOLqU",
    authDomain: "global-chat-cb729.firebaseapp.com",
    projectId: "global-chat-cb729",
    storageBucket: "global-chat-cb729.appspot.com",
    messagingSenderId: "7814295286",
    appId: "1:7814295286:web:da5d1756080bb7d86c46d7"
};
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database()
    class GLOBAL_CHAT{
    home(){
        document.body.innerHTML = ''
        this.create_title()
        this.create_join_form()
    }
    chat(){
        this.create_title()
        this.create_chat()
    }
    create_title(){
        var title_container = document.createElement('div')
        title_container.setAttribute('id', 'title_container')
        var title_inner_container = document.createElement('div')
        title_inner_container.setAttribute('id', 'title_inner_container')
        var title = document.createElement('h1')
        title.setAttribute('id', 'title')
        title.textContent = 'Global Chat'
        var socials = document.createElement('div')
        socials.setAttribute('class','socials')
        socials.innerHTML = `<ul>
            <li><a href="https://www.facebook.com/ashraf.tenshi/" title="facebook" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i></a></li>
            <li><a href="https://github.com/ashraf9932" title="github" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a></li>
            <li><a href="https://www.linkedin.com/in/ashraf-sayed22/" title="linkedin" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin-in"></i></a></li>
            <li><a href="mailto:ashraf.neizk@gmail.com" title="mail" target="_blank"><i class="fa-brands fa-google"></i></a></li>
        </ul>`
        title_inner_container.append(title)
        title_inner_container.append(socials)
        title_container.append(title_inner_container)
        document.body.append(title_container)
    }
    create_join_form(){
        var parent = this;
        var join_container = document.createElement('div')
        join_container.setAttribute('id', 'join_container')
        var join_inner_container = document.createElement('div')
        join_inner_container.setAttribute('id', 'join_inner_container')
        var join_image_container = document.createElement('div')
        join_image_container.setAttribute('id','join_image_container')
        var join_image = document.createElement('input')
        var join_button_container = document.createElement('div')
        join_button_container.setAttribute('id', 'join_button_container')
        join_image.setAttribute('type','url')
        join_image.setAttribute('id','join_image')
        join_image.placeholder = 'Paste Your Image URL Here'
        var join_button = document.createElement('button')
        join_button.setAttribute('id', 'join_button')
        join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'
        var join_password_container = document.createElement('div')
        join_password_container.setAttribute('id','join_password_container')
        var join_password = document.createElement('input')
        join_password.setAttribute('type','password')
        join_password.setAttribute('id','join_password')
        join_password.placeholder = "Enter Your Password"
        var join_input_container = document.createElement('div')
        join_input_container.setAttribute('id', 'join_input_container')
        var join_input = document.createElement('input')
        join_input.setAttribute('id', 'join_input')
        join_input.setAttribute('maxlength', 15)
        join_input.placeholder = 'Enter Your Name Here'
        var join_color = document.createElement('input');
        join_color.setAttribute('id','join_color')
        join_color.setAttribute('type','color')
        join_input.onkeyup  = joinEnabel
        join_password.onkeyup  = joinEnabel
        function joinEnabel(e){
            if(join_input.value.length > 0 && join_password.value.length >= 8){
                join_button.classList.add('enabled')
                join_button.onclick = function(){
                    var user_id = 1
                    db.ref('Users/' + `user_${user_id}`).set({
                        userName:join_input.value,
                        userPassword:join_password.value,
                        userColor:join_color.value,
                        userImage:join_image.value
                    })
                    parent.save_name(join_input.value,join_password.value,join_color.value,join_image.value)
                    join_container.remove()
                    parent.create_chat()
                }
            }else{
                join_button.classList.remove('enabled')
            }
            if(e.key == 'Enter'){
                if(join_input.value.length > 0){
                    parent.save_name(join_input.value,join_password.value,join_color.value,join_image.value)
                    join_container.remove()
                    parent.create_chat()
                }
            }
        }
    join_button_container.append(join_button)
    join_input_container.append(join_color)
    join_input_container.append(join_input)
    join_image_container.append(join_image)
    join_password_container.append(join_password)
    join_inner_container.append(join_input_container, join_password_container, join_image_container, join_button_container)
    join_container.append(join_inner_container)
    document.body.append(join_container)
    }
    create_load(container_id){
        var parent = this;
        var container = document.getElementById(container_id)
        container.innerHTML = ''
        var loader_container = document.createElement('div')
        loader_container.setAttribute('class', 'loader_container')
        var loader = document.createElement('div')
        loader.setAttribute('class', 'loader')
        loader_container.append(loader)
        container.append(loader_container)
    }
    create_chat(){
        var parent = this;
        var title_container = document.getElementById('title_container')
        var title = document.getElementById('title')
        title_container.classList.add('chat_title_container')
        title.classList.add('chat_title')
        var chat_container = document.createElement('div')
        chat_container.setAttribute('id', 'chat_container')
        var chat_inner_container = document.createElement('div')
        chat_inner_container.setAttribute('id', 'chat_inner_container')
        var chat_content_container = document.createElement('div')
        chat_content_container.setAttribute('id', 'chat_content_container')
        var chat_input_container = document.createElement('div')
        chat_input_container.setAttribute('id', 'chat_input_container')
        var chat_input_send = document.createElement('button')
        chat_input_send.setAttribute('id', 'chat_input_send')
        chat_input_send.setAttribute('disabled', true)
        chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`
        var chat_input = document.createElement('input')
        chat_input.setAttribute('id', 'chat_input')
        chat_input.setAttribute('maxlength', 1000)
        chat_input.placeholder = `Say something...`
        chat_input.onfocus = ()=>{chat_input.placeholder = ''}
        chat_input.onblur = ()=>{chat_input.placeholder = 'Say something...'}
        chat_input.onkeyup  = function(e){
        if(chat_input.value.length > 0){
            chat_input_send.removeAttribute('disabled')
            chat_input_send.classList.add('enabled')
            chat_input_send.addEventListener('click',sendMessage)
        }else{
            chat_input_send.classList.remove('enabled')
        }
        if(e.key == 'Enter'){
            sendMessage()
        }
        function sendMessage(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
                return
            }
            parent.create_load('chat_content_container')
            parent.send_message(chat_input.value)
            chat_input.value = ''
            chat_input.focus()
            deleteReplyMessage()
        }
    }
    var chat_logout_container = document.createElement('div')
    chat_logout_container.setAttribute('id', 'chat_logout_container')
    var chat_logout = document.createElement('button')
    chat_logout.setAttribute('id', 'chat_logout')
    chat_logout.textContent = `${parent.get_name()} • logout`
    chat_logout.onclick = function(){
        localStorage.clear()
        parent.home()
    }
    chat_logout_container.append(chat_logout)
    chat_input_container.append(chat_input, chat_input_send)
    chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
    chat_container.append(chat_inner_container)
    document.body.append(chat_container)
    parent.create_load('chat_content_container')
    parent.refresh_chat()
    }
        save_name(name,password,color,image){
            localStorage.setItem('name', name)
            localStorage.setItem('password', password)
            localStorage.setItem('color', color)
            localStorage.setItem('image', image)
        }
        send_message(message){
            var parent = this
            if(parent.get_name() == null && message == null){
                return
            }
            var replyMessage = {}
            if(chat_input_container.childNodes[0].className == 'cloned_message'){
                replyMessage = {
                    message:chat_input_container.childNodes[0].childNodes[0].textContent,
                    index:chat_input_container.childNodes[0].dataset.index
                }
                console.log()
            }
            db.ref('Messages/').once('value', function(message_object) {
                var index = parseFloat(message_object.numChildren()) + 1
                let d = new Date();
                let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                db.ref('Messages/' + `message_${index}`).set({
                    name: localStorage.name,
                    password: localStorage.password,
                    color: localStorage.color,
                    image: localStorage.image,
                    message: message,
                    index: index,
                    messageTime: {
                        hour: d.getHours(),
                        minutes: d.getMinutes(),
                        messageDate: d.getDate()+","+months[d.getMonth()]
                    },
                    deleted: false,
                    reply:replyMessage
                })
                .then(function(){
                    parent.refresh_chat()
                })
            })
        }
        get_name(){
            if(localStorage.getItem('name') != null){
                return localStorage.getItem('name')
            }else{
                this.home()
                return null
            }
        }
        refresh_chat(){
            var chat_content_container = document.getElementById('chat_content_container')
            db.ref('Messages/').on('value', function(messages_object) {
                console.log(messages_object.val());
                if(document.querySelector('.loader_container') != null){
                    document.querySelector('.loader_container').remove()
                }
                if(messages_object.numChildren() == 0){
                    return
                }
                var messages = Object.values(messages_object.val());
                var guide = []
                var unordered = []
                var ordered = []
                var limit = 0
                if(messages.length > 100){
                    limit = messages.length - 100
                }
                for (var i = limit; i < messages.length; i++) {
                    guide.push(i+1)
                    unordered.push([messages[i], messages[i].index]);   
                }
                guide.forEach(function(key) {
                    var found = false
                    unordered = unordered.filter(function(item) {
                        if(!found && item[1] == key) {
                            ordered.push(item[0])
                            found = true
                            return false
                        }else{
                            return true
                        }
                    })
                })
                ordered.forEach(function(data) {    
                    if(data.deleted == true || chat_content_container.contains(document.querySelector(`div.message_container[data-index="${data.index}"]`))){
                        let unWantedMessage = document.querySelector(`div.message_container[data-index="${data.index}"]`)
                        if(data.deleted == true && chat_content_container.contains(unWantedMessage)){
                            unWantedMessage.style.transition = '0.3s'
                            if(data.password == localStorage.password){
                                unWantedMessage.style.transform = 'translateX(-150%)'
                            }else{
                                unWantedMessage.style.transform = 'translateX(150%)'
                            }
                            setTimeout(function(){
                                unWantedMessage.remove()
                            },300)
                        }
                        return false
                    }
                    var name = data.name
                    var message = data.message
                    var color = data.color
                    var image = data.image
                    var message_container = document.createElement('div')
                    message_container.setAttribute('class', 'message_container')
                    message_container.setAttribute('data-index',data.index)
                    var message_time = document.createElement('span')
                    message_time.setAttribute('class','message_time')
                    message_time.innerText = `${data.messageTime.messageDate}  at ${data.messageTime.hour<10?"0"+data.messageTime.hour:(data.messageTime.hour>12?"0"+(data.messageTime.hour-12):data.messageTime.hour)}:${data.messageTime.minutes<10?"0"+data.messageTime.minutes:data.messageTime.minutes} ${data.messageTime.hour>11?"PM":"AM"}`;
                    var message_inner_container = document.createElement('div')
                    message_inner_container.setAttribute('class', 'message_inner_container')
                    var message_content = document.createElement('p')
                    var message_content_container = document.createElement('div')
                    var user_image = document.createElement('img')
                    user_image.setAttribute('class','user_image')
                    image == ""?user_image.src = 'user.webp': user_image.src = image;
                    user_image.style.borderColor = `${color}`
                    var message_user_container = document.createElement('div')
                    message_user_container.style.display = 'block'
                    message_user_container.setAttribute('class', 'message_user_container')
                    var message_user = document.createElement('p')
                    message_user.setAttribute('class', 'message_user')
                    message_user.style.color = `${color}`
                    message_user.textContent = `${name}`
                    var message_deletebtn = document.createElement('div')
                    message_deletebtn.setAttribute('class','message_deletebtn')
                    message_deletebtn.setAttribute('title','Delete Message')
                    message_deletebtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
                    var message_replybtn = document.createElement('div')
                    message_replybtn.setAttribute('class','message_replybtn')
                    message_replybtn.setAttribute('title','Reply')
                    message_replybtn.innerHTML = '<i class="fa-solid fa-reply"></i>'
                    message_user_container.append(message_user)
                    message_inner_container.append(message_user_container)
                    message_container.append(user_image)
                    message_content_container.setAttribute('class', 'message_content_container')
                    message_content.setAttribute('class', 'message_content')
                    message_content.innerHTML = message
                    message_content_container.append(message_content)
                    message_inner_container.append(message_content_container)
                    message_container.append(message_inner_container)
                    message_container.append(message_time)
                    message_container.append(message_deletebtn)
                    message_container.append(message_replybtn)
                    if(data.reply != undefined){
                        message_container.style.marginTop = '30px'
                        var repliedTo = document.createElement('div')
                        var repliedToMessage = document.createElement('p')
                        repliedToMessage.setAttribute('class','repliedTo-message')
                        repliedTo.setAttribute('class','repliedTo')
                        repliedToMessage.textContent = data.reply.message
                        repliedTo.append(repliedToMessage)
                        message_container.append(repliedTo)
                        repliedTo.addEventListener('click',()=>{
                            let realMessage = document.querySelector(`.message_container[data-index="${data.reply.index}"]`)
                            if(realMessage == undefined){
                                window.alert('This Message was Deleted')
                            }else{
                                realMessage.scrollIntoView({behavior: 'smooth'})
                                document.querySelectorAll('.message_container').forEach((e)=>{
                                    e.classList.remove('active_real_message')
                                })
                                realMessage.classList.add('active_real_message')
                            }
                            window.onclick = (event)=>{repliedTo.contains(event.target)?false:document.querySelectorAll('.message_container').forEach((e)=>{e.classList.remove('active_real_message')});}
                        })
                        if(data.password == localStorage.password){
                            repliedTo.style.borderBottomLeftRadius = '5px'
                            repliedTo.style.left = '0'
                            message_container.style.borderTopLeftRadius = '15px'
                        }else{
                            repliedTo.style.borderBottomRightRadius = '5px'
                            repliedTo.style.right = '0'
                            message_container.style.borderTopRightRadius = '15px'
                        }
                    }
                    chat_content_container.append(message_container)
                    message_container.addEventListener('click',function(){
                        document.querySelectorAll('.message_container').forEach(hideMessageTime)
                        message_container.classList.add('shown_time')
                        window.addEventListener('click',(event)=>{
                            if(message_container.contains(event.target)){
                                false
                            }else{
                                hideMessageTime(message_container)
                            }
                        })
                        if(data.password == localStorage.password){
                            message_container.childNodes[3].style.right = '-32px'
                            message_container.childNodes[3].style.opacity = '1'
                            message_container.childNodes[3].style.zIndex = '0'
                            if(message_container.previousSibling != null){
                                if(message_container.previousSibling.childNodes[1].firstChild.firstChild.innerText == data.name && message_container.previousSibling.childNodes[1].firstChild.firstChild.style.color == message_user.style.color){
                                    message_container.childNodes[4].style.right = '-60px'
                                }else{
                                    message_container.childNodes[4].style.right = '-32px'
                                }
                            }else{
                                message_container.childNodes[4].style.right = '-32px'
                            }
                            message_container.childNodes[4].style.opacity = '1'
                            message_container.childNodes[4].style.zIndex = '0'
                        }else{
                            message_container.childNodes[4].style.left = '-32px'
                            message_container.childNodes[4].style.transform = 'rotateY(180deg)'
                            message_container.childNodes[4].style.opacity = '1'
                            message_container.childNodes[4].style.zIndex = '0'
                            message_container.childNodes[4].style.borderTopLeftRadius = '50%'
                            message_container.childNodes[4].addEventListener('mouseenter',()=>{message_container.childNodes[4].style.backgroundColor = '#ddd'})
                            message_container.childNodes[4].addEventListener('mouseleave',()=>{message_container.childNodes[4].style.backgroundColor = '#eee'})
                        }
                    })
                    function hideMessageTime(e){
                        e.classList.remove('shown_time')
                        e.childNodes[3].style.right = '10px'
                        e.childNodes[3].style.opacity = '0'
                        e.childNodes[3].style.zIndex = '-1'
                        e.childNodes[4].style.right = '10px'
                        e.childNodes[4].style.opacity = '0'
                        e.childNodes[4].style.zIndex = '-1'
                    }
                    if(data.password == localStorage.password){
                        message_container.style.marginLeft = 'initial'
                        message_container.style.borderBottomLeftRadius = '15px'
                        message_container.style.backgroundColor = '#D64045'
                        message_content.style.color = 'white'
                        message_container.childNodes[2].style.left = '-10px'
                    }else{
                        message_container.style.borderBottomRightRadius = '15px'
                    }
                    if(message_container.previousSibling != null){
                        if(message_container.previousSibling.childNodes[1].firstChild.firstChild.innerText == data.name && message_container.previousSibling.childNodes[1].firstChild.firstChild.style.color == message_user.style.color){
                            message_container.style.paddingLeft = '20px'
                            message_container.childNodes[3].style.top = '7px'
                            message_container.childNodes[3].style.borderBottomLeftRadius = '50%'
                            message_container.childNodes[4].style.bottom = '10px'
                            message_container.childNodes[4].style.borderTopLeftRadius = '50%'
                            if(data.password == localStorage.password){
                                message_container.style.borderTopLeftRadius = '15px'
                                message_container.style.borderBottomLeftRadius = '50px'
                            }else{
                                message_container.style.borderTopRightRadius = '15px'
                                message_container.style.borderBottomRightRadius = '50px'
                            }
                            user_image.style.display = 'none'
                            message_user_container.style.display = 'none'
                            if(message_container.previousSibling.childNodes[1].firstChild.style.display == 'none'){
                                if(data.password == localStorage.password){
                                    message_container.previousSibling.style.borderBottomLeftRadius = '15px'
                                }else{
                                    message_container.previousSibling.style.borderBottomRightRadius = '15px'
                                }
                            }
                        }
                    }
                    message_deletebtn.addEventListener('click',function(){
                        var confirm_delete_message_container = document.createElement('div')
                        confirm_delete_message_container.setAttribute('id','confirm_delete_message_container')
                        var confirm_delete_message = document.createElement('div')
                        confirm_delete_message.setAttribute('id','confirm_delete_message')
                        var delete_message_text = document.createElement('p')
                        delete_message_text.setAttribute('id','delete_message_text')
                        delete_message_text.innerText = 'Delete Message ?'
                        var buttons_container = document.createElement('div')
                        buttons_container.setAttribute('id','buttons_container')
                        var button_delete = document.createElement('button')
                        button_delete.setAttribute('id','button_delete')
                        button_delete.innerText = 'Delete'
                        button_delete.onclick = function(){
                            if(data.password == localStorage.password){
                                db.ref('Messages/' + `message_${data.index}`).update({
                                    deleted: true   
                                })
                                closeDeleteMessage()
                            }else{
                                window.alert('You can\'t delete this')
                            }
                        }
                        var button_keep = document.createElement('button')
                        button_keep.setAttribute('id','button_keep')
                        button_keep.innerText = 'No,Keep'
                        button_keep.onclick = function(){
                            closeDeleteMessage()
                        }
                        buttons_container.append(button_delete,button_keep)
                        confirm_delete_message.append(delete_message_text)
                        confirm_delete_message.append(buttons_container)
                        confirm_delete_message_container.append(confirm_delete_message)
                        document.body.append(confirm_delete_message_container)
                        function closeDeleteMessage(){
                            confirm_delete_message_container.remove()
                        }
                    })
                    message_replybtn.addEventListener('click',function(){
                        deleteReplyMessage()
                        var cloned_message = message_container.cloneNode(true).childNodes[1].childNodes[1];
                        cloned_message.setAttribute('class','cloned_message')
                        cloned_message.setAttribute('data-index',data.index)
                        var close_cloned_message = document.createElement('span')
                        close_cloned_message.setAttribute('class','close_cloned_message')
                        close_cloned_message.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'
                        setTimeout(()=>{cloned_message.style.opacity = '1'},0)
                        close_cloned_message.addEventListener('click',()=>{
                            deleteReplyMessage()
                        })
                        chat_input.focus()
                        cloned_message.append(close_cloned_message)
                        chat_input_container.insertBefore(cloned_message,chat_input_container.firstChild)
                    })
                });
                chat_content_container.scrollTop = chat_content_container.scrollHeight;
            })
        }
    }
    function deleteReplyMessage(){
        if(chat_input_container.childNodes[0].className == 'cloned_message'){
            chat_input_container.childNodes[0].style.opacity = '0'
                chat_input_container.childNodes[0].remove()
        }
    }
var app = new GLOBAL_CHAT()
        if(app.get_name() != null){
        app.chat()
    }
}