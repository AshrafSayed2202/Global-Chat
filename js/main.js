// import { initializeApp } from "firebase/app";
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
        // this.create_footer()
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
        var join_input_container = document.createElement('div')
        join_input_container.setAttribute('id', 'join_input_container')
        var join_input = document.createElement('input')
        join_input.setAttribute('id', 'join_input')
        join_input.setAttribute('maxlength', 15)
        join_input.placeholder = 'Enter Your Name Here'
        var join_color = document.createElement('input');
        join_color.setAttribute('id','join_color')
        join_color.setAttribute('type','color')
        join_input.onkeyup  = function(e){
        if(join_input.value.length > 0){
            join_button.classList.add('enabled')
            join_button.onclick = function(){
                parent.save_name(join_input.value,join_color.value,join_image.value)
                join_container.remove()
                parent.create_chat()
            }
        }else{
            join_button.classList.remove('enabled')
        }
        if(e.key == 'Enter'){
            if(join_input.value.length > 0){
                parent.save_name(join_input.value,join_color.value,join_image.value)
                join_container.remove()
                parent.create_chat()
            }
        }
    }
    join_button_container.append(join_button)
    join_input_container.append(join_color)
    join_input_container.append(join_input)
    join_image_container.append(join_image)
    join_inner_container.append(join_input_container, join_image_container, join_button_container)
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
        chat_input.placeholder = `${parent.get_name()}. Say something...`
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
        save_name(name,color,image){
            localStorage.setItem('name', name)
            localStorage.setItem('color', color)
            localStorage.setItem('image', image)
        }
        send_message(message){
            var parent = this
            if(parent.get_name() == null && message == null){
                return
            }
            db.ref('chats/').once('value', function(message_object) {
                var index = parseFloat(message_object.numChildren()) + 1
                let d = new Date();
                // let message_time = `${d.getHours()}:${d.getMinutes()}`;
                db.ref('chats/' + `message_${index}`).set({
                    name: parent.get_name(),
                    color: parent.get_color(),
                    image: parent.get_image(),
                    message: message,
                    index: index,
                    messageTime: {
                        hour: d.getHours(),
                        minutes: d.getMinutes()
                    }
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
        get_color(){
            if(localStorage.getItem('color') != null){
                return localStorage.getItem('color')
            }else{
                this.home()
                return null
            }
        }
        get_image(){
            if(localStorage.getItem('image') != null){
                return localStorage.getItem('image')
            }else{
                this.home()
                return null
            }
        }
        refresh_chat(){
            var chat_content_container = document.getElementById('chat_content_container')
            db.ref('chats/').on('value', function(messages_object) {
                chat_content_container.innerHTML = ''
                if(messages_object.numChildren() == 0){
                    return
                }
                var messages = Object.values(messages_object.val());
                var guide = []
                var unordered = []
                var ordered = []
                for (var i, i = 0; i < messages.length; i++) {
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
                    var name = data.name
                    var message = data.message
                    var color = data.color
                    var image = data.image
                    var message_container = document.createElement('div')
                    message_container.setAttribute('class', 'message_container')
                    var message_time = document.createElement('span')
                    message_time.setAttribute('class','message_time')
                    message_time.innerText = `${data.messageTime.hour<10?"0"+data.messageTime.hour:data.messageTime.hour}:${data.messageTime.minutes<10?"0"+data.messageTime.minutes:data.messageTime.minutes} ${data.messageTime.hour>11?"PM":"AM"}`;
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
                    message_user_container.append(message_user)
                    message_inner_container.append(message_user_container)
                    message_container.append(user_image)
                    message_content_container.setAttribute('class', 'message_content_container')
                    message_content.setAttribute('class', 'message_content')
                    message_content.textContent = `${message}`
                    message_content_container.append(message_content)
                    message_inner_container.append(message_content_container)
                    message_container.append(message_inner_container)
                    message_container.append(message_time)
                    chat_content_container.append(message_container)
                    if(data.index > 1){
                        if(message_container.previousSibling.childNodes[1].firstChild.firstChild.innerText == data.name && message_container.previousSibling.childNodes[1].firstChild.firstChild.style.color == message_user.style.color){
                            message_container.style.paddingLeft = '20px'
                            message_container.style.borderTopLeftRadius = '15px'
                            message_container.style.borderBottomLeftRadius = '50px'
                            user_image.style.display = 'none'
                            message_user_container.style.display = 'none'
                            if(message_container.previousSibling.childNodes[1].firstChild.style.display == 'none'){
                                message_container.previousSibling.style.borderBottomLeftRadius = '15px'
                            }
                        }
                    }
                });
                chat_content_container.scrollTop = chat_content_container.scrollHeight;
            })
        }
    }
var app = new GLOBAL_CHAT()
        if(app.get_name() != null){
        app.chat()
    }
}