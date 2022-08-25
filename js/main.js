import {  } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"
import {  } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"
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
var auth = firebase.auth()
window.onload = function() {
    class GLOBAL_CHAT{
        home(){
        document.body.innerHTML = ''
        this.create_title()
        this.create_join_form()
        }
        chat(chatName){
        this.create_title()
        this.create_chat(chatName)
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
        document.getElementById('title_container').remove()
        var join_container = document.createElement('div')
        join_container.setAttribute('class','container')
        var signInSignUp = document.createElement('div')
        signInSignUp.setAttribute('class','signin-signup')
        // sign in
        var sign_in_form = document.createElement('form')
        sign_in_form.setAttribute('action',"")
        sign_in_form.setAttribute('class','sign-in-form')
        var sign_in_title = document.createElement('h2')
        sign_in_title.setAttribute('class','title')
        sign_in_title.innerText = 'Sign in'
        var sign_in_user_input_field = document.createElement('div')
        sign_in_user_input_field.setAttribute('class','input-field')
        sign_in_user_input_field.innerHTML = '<i class="fas fa-user"></i>'
        var sign_in_user_input = document.createElement('input')
        sign_in_user_input.type = 'text'
        sign_in_user_input.placeholder = 'Email'
        sign_in_user_input.oninput = ()=>{if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sign_in_user_input.value)){sign_in_user_input_field.style.border = "3px solid green"}else{sign_in_user_input_field.style.border = '2px solid #d64045'}}
        sign_in_user_input_field.append(sign_in_user_input)
        var sign_in_password_input_field = document.createElement('div')
        sign_in_password_input_field.setAttribute('class','input-field')
        sign_in_password_input_field.innerHTML = '<i class="fas fa-lock"></i>'
        var sign_in_password_input = document.createElement('input')
        sign_in_password_input.type = "password"
        sign_in_password_input.placeholder = "Password"
        sign_in_password_input.oninput = ()=>{if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(sign_in_password_input.value)){sign_in_password_input_field.style.border = "3px solid green"}else{sign_in_password_input_field.style.border = '2px solid #d64045'}}
        sign_in_password_input_field.append(sign_in_password_input)
        var forget_password = document.createElement('p')
        forget_password.setAttribute('class','forget-password')
        forget_password.textContent = 'Forget your password ?🤔'
        forget_password.addEventListener('click',()=>{
            window.onkeyup = function(e){
                if(e.key == 'Escape'){
                    closeForgetPassword()
                }
            }
            var reset_password_container = document.createElement('div')
            reset_password_container.setAttribute('class','reset_password_container')
            setTimeout(()=>{
                reset_password_container.style.opacity = '1'
            },0)
            var reset_password = document.createElement('div')
            reset_password.setAttribute('class','reset_password')
            var reset_password_message = document.createElement('p')
            reset_password_message.setAttribute('class','reset_password_message')
            reset_password_message.textContent = 'Enter you email address and you will receive reset password link'
            var dont_forget = document.createElement('p')
            dont_forget.setAttribute('class','dont_forget')
            dont_forget.textContent = '⚠️Don\'t forget to check your SPAM folder⚠️'
            var reset_password_input_field = document.createElement('div')
            reset_password_input_field.setAttribute('class','reset_password_input_field')
            var reset_password_input = document.createElement('input')
            reset_password_input.type = 'email'
            reset_password_input.placeholder = 'Email Address'
            reset_password_input.onkeyup = (e)=>{
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(reset_password_input.value)){
                    reset_password_input_field.style.border = '3px solid green'
                }else{
                    reset_password_input_field.style.border = '3px solid #d64045'
                }
                if(e.key == 'Enter'){
                    sendTheReset()
                }
            }
            reset_password_input_field.append(reset_password_input)
            var reset_btn = document.createElement('div')
            reset_btn.setAttribute('class','reset_btn')
            reset_btn.textContent = 'Reset'
            reset_btn.addEventListener('click',sendTheReset)
            var remembered = document.createElement('div')
            remembered.setAttribute('class','remembered')
            remembered.textContent = 'No problem I remembered it'
            remembered.addEventListener('click',closeForgetPassword)
            reset_password.append(reset_password_message,dont_forget,reset_password_input_field,reset_btn,remembered)
            reset_password_container.append(reset_password)
            document.body.append(reset_password_container)
            function sendTheReset(){
                auth.sendPasswordResetEmail(reset_password_input.value)
                .then(()=>{
                    //Password reset email sent
                    closeForgetPassword()
                    window.alert('✅Reset mail sent')
                })
                .catch((error)=>{
                    window.alert(error.message)
                })
            }
            function closeForgetPassword(){
                reset_password_container.style.opacity = '0'
                setTimeout(()=>{
                    reset_password_container.remove()
                },300)
            }
        })
        var sign_in_submit = document.createElement('input')
        sign_in_submit.type = 'submit'
        sign_in_submit.value = 'Login'
        sign_in_submit.setAttribute('class','btn')
        sign_in_submit.addEventListener('click',(e)=>{
            e.preventDefault()
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sign_in_user_input.value)){
                if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(sign_in_password_input.value)){
                    auth.signInWithEmailAndPassword(sign_in_user_input.value, sign_in_password_input.value)
                    .then((userCredential) => {
                        var user = userCredential.user;
                    })
                    .catch((error) => {
                        window.alert(error.message)
                    });
                }else{
                    sign_in_password_input_field.style.border = '3px solid red'
                    sign_in_password_input.focus()
                }
            }else{
                sign_in_user_input_field.style.border = '3px solid red'
                sign_in_user_input.focus()
            }
        })
        var sign_in_account_text = document.createElement('p')
        sign_in_account_text.setAttribute('class','account-text')
        sign_in_account_text.innerText = "Don't have an account? "
        var sign_up_btn2 = document.createElement('a')
        sign_up_btn2.href = '#'
        sign_up_btn2.id ='sign-up-btn2'
        sign_up_btn2.innerText = 'Sign up'
        sign_up_btn2.addEventListener('click',()=>{join_container.classList.add('sign-up-mode2')})
        sign_in_account_text.append(sign_up_btn2)
        sign_in_form.append(sign_in_title,sign_in_user_input_field,sign_in_password_input_field,forget_password,sign_in_submit,sign_in_account_text)
        // sign up
        var sign_up_form = document.createElement('form')
        sign_up_form.setAttribute('action',"")
        sign_up_form.setAttribute('class','sign-up-form')
        var sign_up_title = document.createElement('h2')
        sign_up_title.setAttribute('class','title')
        sign_up_title.innerText = 'Sign up'
        var sign_up_user_input_field = document.createElement('div')
        sign_up_user_input_field.setAttribute('class','input-field')
        sign_up_user_input_field.innerHTML = `<i class="fas fa-user"></i>`
        var sign_up_user_input = document.createElement('input')
        sign_up_user_input.type = 'text'
        sign_up_user_input.placeholder = 'Username'
        sign_up_user_input.oninput = ()=>{if(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(sign_up_user_input.value)){sign_up_user_input_field.style.border = "3px solid green"}else{sign_up_user_input_field.style.border = '2px solid #d64045'}}
        var sign_up_color_input = document.createElement('input')
        sign_up_color_input.setAttribute('class','color-input')
        sign_up_color_input.type = 'color'
        sign_up_color_input.value = '#ffb317'
        sign_up_user_input_field.append(sign_up_color_input,sign_up_user_input)
        var sign_up_image_input_field = document.createElement('div')
        sign_up_image_input_field.setAttribute('class','input-field optional')
        sign_up_image_input_field.innerHTML = `<i class="fa-solid fa-camera"></i>`
        var sign_up_image_input = document.createElement('input')
        sign_up_image_input.type = 'url'
        sign_up_image_input.placeholder = 'Image link'
        sign_up_image_input_field.append(sign_up_image_input)
        var sign_up_email_input_field = document.createElement('div')
        sign_up_email_input_field.setAttribute('class','input-field')
        sign_up_email_input_field.innerHTML = `<i class="fas fa-envelope"></i>`
        var sign_up_email_input = document.createElement('input')
        sign_up_email_input.type = 'text'
        sign_up_email_input.placeholder = 'Email'
        sign_up_email_input.oninput = ()=>{if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sign_up_email_input.value)){sign_up_email_input_field.style.border = "3px solid green"}else{sign_up_email_input_field.style.border = '2px solid #d64045'}}
        sign_up_email_input_field.append(sign_up_email_input)
        var sign_up_password_input_field = document.createElement('div')
        sign_up_password_input_field.setAttribute('class','input-field')
        sign_up_password_input_field.innerHTML = `<i class="fas fa-lock"></i>`
        var sign_up_password_input = document.createElement('input')
        sign_up_password_input.type = 'password'
        sign_up_password_input.placeholder = 'Password'
        sign_up_password_input.oninput = ()=>{if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(sign_up_password_input.value)){sign_up_password_input_field.style.border = "3px solid green"}else{sign_up_password_input_field.style.border = '2px solid #d64045'}}
        sign_up_password_input_field.append(sign_up_password_input)
        var sign_up_confirm_password_input_field = document.createElement('div')
        sign_up_confirm_password_input_field.setAttribute('class','input-field')
        sign_up_confirm_password_input_field.innerHTML = `<i class="fas fa-lock"></i>`
        var sign_up_confirm_password_input = document.createElement('input')
        sign_up_confirm_password_input.type = 'password'
        sign_up_confirm_password_input.placeholder = 'Confirm Password'
        sign_up_confirm_password_input.oninput = ()=>{if(sign_up_confirm_password_input.value == sign_up_password_input.value){sign_up_confirm_password_input_field.style.border = "3px solid green"}else{sign_up_confirm_password_input_field.style.border = '2px solid #d64045'}}
        sign_up_confirm_password_input_field.append(sign_up_confirm_password_input)
        var sign_up_submit = document.createElement('input')
        sign_up_submit.type = 'submit'
        sign_up_submit.value = 'Sign up'
        sign_up_submit.setAttribute('class','btn')
        sign_up_submit.addEventListener('click',(e)=>{
            e.preventDefault()
            if(/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/.test(sign_up_user_input.value)){
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sign_up_email_input.value)){
                    if( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(sign_up_password_input.value)){
                        if(sign_up_confirm_password_input.value == sign_up_password_input.value){
                            auth.createUserWithEmailAndPassword(sign_up_email_input.value,sign_up_password_input.value).then((cred)=>{
                                db.ref(`users/${cred.user.uid}`).set({
                                    name:sign_up_user_input.value,
                                    email:sign_up_email_input.value,
                                    image:sign_up_image_input.value,
                                    color:sign_up_color_input.value,
                                    bio:''
                                })
                            }).catch(async function(error){
                                const validate = await error.message
                                return validate
                            }).then((error)=>{
                                    if(error != 'The email address is already in use by another account.'){
                                        auth.currentUser.updateProfile({
                                            displayName:sign_up_user_input.value,
                                            providerId:sign_up_user_input.value,
                                            photoURL:sign_up_image_input.value
                                        })
                                        join_container.remove()
                                        parent.chat('Global')
                                    }else{
                                        window.alert(error)
                                    }
                            })
                        }else{
                            sign_up_confirm_password_input_field.style.border = '3px solid red'
                            sign_up_confirm_password_input.focus()
                        }
                    }else{
                        sign_up_password_input_field.style.border = '3px solid red'
                        sign_up_password_input.focus()
                    }
                }else{
                    sign_up_email_input_field.style.border = '3px solid red'
                    sign_up_email_input.focus()
                }
            }else{
                sign_up_user_input_field.style.border = '3px solid red'
                sign_up_user_input.focus()
            }
        })
        var sign_up_account_text = document.createElement('p')
        sign_up_account_text.setAttribute('class','account-text')
        sign_up_account_text.innerText = 'Already have an account? '
        var sign_in_btn2 = document.createElement('a')
        sign_in_btn2.href = '#'
        sign_in_btn2.id = 'sign-in-btn2'
        sign_in_btn2.innerText = 'Sign in'
        sign_in_btn2.addEventListener('click',()=>{join_container.classList.remove('sign-up-mode2')})
        sign_up_account_text.append(sign_in_btn2)
        sign_up_form.append(sign_up_title,sign_up_user_input_field,sign_up_image_input_field,sign_up_email_input_field,sign_up_password_input_field,sign_up_confirm_password_input_field,sign_up_submit,sign_up_account_text)
        // Append forms
        signInSignUp.append(sign_in_form,sign_up_form)
        // panels
        var panels_container = document.createElement('div')
        panels_container.setAttribute('class','panels-container')
        // panel left
        var panel_left = document.createElement('div')
        panel_left.classList.add('panel','left-panel')
        var left_panel_content = document.createElement('div')
        left_panel_content.setAttribute('class','content')
        var left_panel_h3 = document.createElement('h3')
        left_panel_h3.innerText = 'Member of Global chat?'
        var left_panel_p = document.createElement('p')
        left_panel_p.innerText = 'Sign in with your account now and chat like a free bird in the sky.'
        var left_panel_btn = document.createElement('button')
        left_panel_btn.setAttribute('class','btn')
        left_panel_btn.id = 'sign-in-btn'
        left_panel_btn.innerText = 'Sign in'
        left_panel_btn.addEventListener('click',()=>{join_container.classList.remove('sign-up-mode')})
        left_panel_content.append(left_panel_h3,left_panel_p,left_panel_btn)
        var left_panel_img = document.createElement('img')
        left_panel_img.setAttribute('class','image')
        left_panel_img.src = 'signin.svg'
        left_panel_img.alt = ''
        panel_left.append(left_panel_content,left_panel_img)
        // panel right
        var panel_right = document.createElement('div')
        panel_right.classList.add('panel','right-panel')
        var right_panel_content = document.createElement('div')
        right_panel_content.setAttribute('class','content')
        var right_panel_h3 = document.createElement('h3')
        right_panel_h3.innerText = 'New to Global chat?'
        var right_panel_p = document.createElement('p')
        right_panel_p.innerText = 'Creat an Account now and Enjoy chatting with randoms in global or with friends in private.'
        var right_panel_btn = document.createElement('button')
        right_panel_btn.setAttribute('class','btn')
        right_panel_btn.id = 'sign-up-btn'
        right_panel_btn.innerText = 'Sign up'
        right_panel_btn.addEventListener('click',()=>{join_container.classList.add('sign-up-mode')})
        right_panel_content.append(right_panel_h3,right_panel_p,right_panel_btn)
        var right_panel_img = document.createElement('img')
        right_panel_img.setAttribute('class','image')
        right_panel_img.src = 'signup.svg'
        right_panel_img.alt = ''
        panel_right.append(right_panel_content,right_panel_img)
        // Append panels
        panels_container.append(panel_left,panel_right)
        // Append all
        join_container.append(signInSignUp,panels_container)
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
        create_chat(chat_name){
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
            var chat_name_container = document.createElement('div')
            chat_name_container.setAttribute('class','chat_name_container')
            chat_name_container.textContent = chat_name
            var chat_input_container = document.createElement('div')
            chat_input_container.setAttribute('id', 'chat_input_container')
            var chat_input_send = document.createElement('button')
            chat_input_send.setAttribute('id', 'chat_input_send')
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`
            var chat_input = document.createElement('input')
            chat_input.setAttribute('id', 'chat_input')
            chat_input.setAttribute('maxlength', 1000)
            chat_input.setAttribute('autocomplete', 'off')
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
                    parent.send_message(chat_input.value,chat_name)
                    chat_input.value = ''
                    chat_input.focus()
                    deleteReplyMessage()
                }
            }
            var chat_logout = document.createElement('div')
            chat_logout.setAttribute('id', 'chat_logout')
            chat_logout.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>`
            chat_logout.onclick = function(){
                auth.signOut().then(()=>{
                }).catch((error)=>{
                    console.log(error.message);
                })
            }
            var profile_image_container = document.createElement('div')
            profile_image_container.setAttribute('class','profile_image_container')
            var profile_image = document.createElement('img')
            profile_image.setAttribute('src',auth.currentUser.photoURL)
            var profile_contaner = document.createElement('div')
            profile_contaner.setAttribute('class','profile_contaner')
            profile_image_container.onclick = ()=>{
                profile_contaner.classList.toggle('profile-active')
            }
            var join_room_btn = document.createElement('p')
            join_room_btn.setAttribute('class','join_room_btn')
            join_room_btn.textContent = 'Join private room.'
            join_room_btn.addEventListener('click',()=>{
                window.onkeyup = function(e){
                    if(e.key == "Escape"){
                        closeJoinRoom()
                    }
                }
                var join_room_container = document.createElement('div')
                join_room_container.setAttribute('class','join_room_container')
                setTimeout(()=>{
                    join_room_container.style.opacity = '1'
                },0)
                var join_room = document.createElement('div')
                join_room.setAttribute('class','join_room')
                var join_room_title = document.createElement('p')
                join_room_title.innerHTML = 'Join Private Room'
                var join_buttons = document.createElement('div')
                join_buttons.style.height = '130px'
                join_buttons.style.marginTop = '25px'
                var join_btn = document.createElement('div')
                join_btn.setAttribute('class','join_btn')
                join_btn.textContent = "Join Room"
                join_btn.addEventListener('click',()=>{
                    join_buttons.innerHTML = ''
                    var join_room_name_field = document.createElement('div')
                    join_room_name_field.setAttribute('class','input-field')
                    join_room_name_field.style.width = '80%'
                    join_room_name_field.style.margin = 'auto'
                    var join_room_name = document.createElement('input')
                    join_room_name.placeholder = 'Room Name'
                    join_room_name.setAttribute('class','creat_room_input')
                    join_room_name.onkeyup = (e)=>{
                        if(e.key == "Enter"){
                            confrimRoomName()
                        }
                    }
                    var confirm_room_name = document.createElement('div')
                    confirm_room_name.textContent = 'Confirm'
                    confirm_room_name.setAttribute('class','join_btn')
                    confirm_room_name.addEventListener('click',confrimRoomName)
                    function confrimRoomName(){
                        db.ref(`Rooms/`).once('value',(rooms_object)=>{
                            if(join_room_name.value.length >= 5 && rooms_object.val()[`${join_room_name.value}`] != undefined){
                                var room_password_field = document.createElement('div')
                                room_password_field.setAttribute('class','input-field')
                                room_password_field.style.width = '80%'
                                room_password_field.style.margin = '25px auto'
                                var room_password = document.createElement('input')
                                room_password.type = 'password'
                                room_password.placeholder = 'Room Password'
                                room_password.setAttribute('class','creat_room_input')
                                room_password.onkeyup = (e)=>{
                                    if(e.key == "Enter"){
                                        confirmRoomPassword()
                                    }
                                }
                                room_password_field.append(room_password)
                                join_room_name.setAttribute('disabled','')
                                join_room_name_field.style.backgroundColor = '#ccc'
                                confirm_room_name.remove()
                                var confirm_room_create = document.createElement('div')
                                confirm_room_create.textContent = 'Join Room'
                                confirm_room_create.setAttribute('class','join_btn')
                                confirm_room_create.addEventListener('click',confirmRoomPassword)
                                function confirmRoomPassword(){
                                    db.ref(`Rooms/${join_room_name.value}`).once('value',(e)=>{
                                        if(room_password.value.length >= 5 && room_password.value == e.val().password){
                                            localStorage.setItem('room',join_room_name.value)
                                            document.body.innerHTML = ''
                                            parent.chat(join_room_name.value)
                                            closeJoinRoom()
                                        }
                                    })
                                }
                                join_buttons.append(room_password_field,confirm_room_create)
                            }
                        })
                    }
                    join_room_name_field.append(join_room_name)
                    join_buttons.append(join_room_name_field,confirm_room_name)
                    
                })
                var create_btn = document.createElement('div')
                create_btn.setAttribute('class','join_btn')
                create_btn.textContent = "Create New Room"
                create_btn.addEventListener('click',()=>{
                    join_buttons.innerHTML = ''
                    var creat_room_name_field = document.createElement('div')
                    creat_room_name_field.setAttribute('class','input-field')
                    creat_room_name_field.style.width = '80%'
                    creat_room_name_field.style.margin = 'auto'
                    var creat_room_name = document.createElement('input')
                    creat_room_name.placeholder = 'Room Name'
                    creat_room_name.setAttribute('class','creat_room_input')
                    creat_room_name.onkeyup = (e)=>{
                        if(e.key == "Enter"){
                            confrimRoomName()
                        }
                    }
                    var confirm_room_name = document.createElement('div')
                    confirm_room_name.textContent = 'Confirm'
                    confirm_room_name.setAttribute('class','join_btn')
                    confirm_room_name.addEventListener('click',confrimRoomName)
                    function confrimRoomName(){
                        db.ref(`Rooms/`).once('value',(rooms_object)=>{
                            if(creat_room_name.value.length >= 5 && rooms_object.val()[`${creat_room_name.value}`] == undefined){
                                var room_password_field = document.createElement('div')
                                room_password_field.setAttribute('class','input-field')
                                room_password_field.style.width = '80%'
                                room_password_field.style.margin = '25px auto'
                                var room_password = document.createElement('input')
                                room_password.type = 'password'
                                room_password.placeholder = 'Room Password'
                                room_password.setAttribute('class','creat_room_input')
                                room_password.onkeyup = (e)=>{
                                    if(e.key == 'Enter'){
                                        confirmRoomPassword()
                                    }
                                }
                                room_password_field.append(room_password)
                                creat_room_name.setAttribute('disabled','')
                                creat_room_name_field.style.backgroundColor = '#ccc'
                                confirm_room_name.remove()
                                var confirm_room_create = document.createElement('div')
                                confirm_room_create.textContent = 'Create Room'
                                confirm_room_create.setAttribute('class','join_btn')
                                confirm_room_create.addEventListener('click',confirmRoomPassword)
                                function confirmRoomPassword(){
                                    db.ref(`Rooms/`).once('value',(rooms_object)=>{
                                        if(room_password.value.length >= 5 && rooms_object.val()[`${creat_room_name.value}`] == undefined){
                                            db.ref(`Rooms/${creat_room_name.value}`).set({
                                                password:room_password.value
                                            })
                                            localStorage.setItem('room',creat_room_name.value)
                                            document.body.innerHTML = ''
                                            parent.chat(creat_room_name.value)
                                            closeJoinRoom()
                                        }
                                    })
                                }
                                join_buttons.append(room_password_field,confirm_room_create)
                            }
                        })
                    }
                    creat_room_name_field.append(creat_room_name)
                    join_buttons.append(creat_room_name_field,confirm_room_name)
                })
                var join_cancel_btn = document.createElement('div')
                join_cancel_btn.setAttribute('class','join_cancel_btn')
                join_cancel_btn.textContent = 'cancel'
                join_cancel_btn.onclick = closeJoinRoom
                join_buttons.append(join_btn,create_btn)
                join_room.append(join_room_title,join_buttons,join_cancel_btn)
                join_room_container.append(join_room)
                document.body.append(join_room_container)
                function closeJoinRoom(){
                    join_room_container.style.opacity = '0'
                    setTimeout(()=>{
                        join_room_container.remove()
                    },300)
                }
            })
            profile_image_container.append(profile_image)
            chat_input_container.append(chat_input,chat_input_send)
            chat_inner_container.append(chat_name_container,chat_content_container, chat_input_container, chat_logout,profile_image_container,profile_contaner,join_room_btn)
            chat_container.append(chat_inner_container)
            document.body.append(chat_container)
            parent.create_load('chat_content_container')
            parent.refresh_chat(chat_name)
        }
        send_message(message,chatName){
            var parent = this
            console.log();
            if(auth.currentUser.uid != null && message == null){
                return
            }
            var replyMessage = {}
            if(chat_input_container.childNodes[0].className == 'cloned_message'){
                replyMessage = {
                    message:chat_input_container.childNodes[0].childNodes[0].innerHTML,
                    index:chat_input_container.childNodes[0].dataset.index
                }
            }
            db.ref(`users/${auth.currentUser.uid}`).on('value',(user)=>{
                user = user.val()
                db.ref(`Rooms/${chatName}/messages`).once('value', function(message_object) {
                    var index = parseFloat(message_object.numChildren()) + 1
                    let d = new Date();
                    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    db.ref(`Rooms/${chatName}/messages/message_${index}`).set({
                        user: {
                            uid:auth.currentUser.uid,
                            name:user.name,
                            color:user.color,
                            image:user.image
                        },
                        message: message,
                        index: index,
                        messageTime: {
                            hour: d.getHours(),
                            minutes: d.getMinutes(),
                            messageDate: {
                                day: d.getDate(),
                                month:months[d.getMonth()]
                            }
                        },
                        deleted: false,
                        reply:replyMessage
                    })
                    .then(function(){
                        parent.refresh_chat(chatName)
                    })
                })
            })
        }
        refresh_chat(chatName){
            var parent = this
            var chat_content_container = document.getElementById('chat_content_container')
            db.ref(`Rooms/${chatName}/messages`).on('value', function(messages_object) {
                if(document.querySelector('.loader_container') != null){
                    document.querySelector('.loader_container').remove()
                }
                if(messages_object.numChildren() == 0){
                    return
                }
                var messages = []
                messages = Object.values(messages_object.val());
                var guide = []
                var unordered = []
                var ordered = []
                for (var i = 0; i < messages.length; i++) {
                    guide.push(i+1)
                    unordered.push([messages[i], messages[i].index]);   
                }
                guide.forEach(function(key) {
                    var found = true
                    unordered = unordered.filter(function(item) {
                        if(found && item[1] == key) {
                            ordered.push(item[0])
                            found = false
                            return false
                        }else{
                            return true
                        }
                    })
                })
                var newOrdered = ordered.slice(-50)
                newOrdered.forEach(createMessage);
                function createMessage(data){
                    if(data.deleted == true || chat_content_container.contains(document.querySelector(`div.message_container[data-index="${data.index}"]`))){
                        let unWantedMessage = document.querySelector(`div.message_container[data-index="${data.index}"]`)
                        if(data.deleted == true && chat_content_container.contains(unWantedMessage)){
                            unWantedMessage.style.transition = '0.3s'
                            if(data.user.uid == auth.currentUser.uid){
                                unWantedMessage.style.transform = 'translateX(-150%)'
                            }else{
                                unWantedMessage.style.transform = 'translateX(150%)'
                            }
                            setTimeout(function(){
                                if(unWantedMessage.nextSibling != null){
                                    if(unWantedMessage.childNodes[0].style.display == 'block'){
                                        if(unWantedMessage.nextSibling.childNodes[0].style.display == 'none'){
                                            if(data.user.uid == auth.currentUser.uid){
                                                unWantedMessage.nextSibling.style.borderTopLeftRadius = '35px'
                                                if(unWantedMessage.nextSibling.nextSibling == null || unWantedMessage.nextSibling.nextSibling.childNodes[0].style.display == 'block'){
                                                    unWantedMessage.nextSibling.style.borderBottomLeftRadius = '15px'
                                                }
                                            }else{
                                                unWantedMessage.nextSibling.style.borderTopRightRadius = '35px'
                                                if(unWantedMessage.nextSibling.nextSibling == null || unWantedMessage.nextSibling.nextSibling.childNodes[0].style.display == 'block'){
                                                    unWantedMessage.nextSibling.style.borderBottomRightRadius = '15px'
                                                }
                                            }
                                            unWantedMessage.nextSibling.childNodes[0].style.display = 'block'
                                            unWantedMessage.nextSibling.childNodes[1].childNodes[0].style.display = 'block'
                                            unWantedMessage.nextSibling.style.paddingLeft = '10px'
                                        }
                                    }
                                }
                                unWantedMessage.remove()
                            },300)
                        }
                        return false
                    }
                    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    let d = new Date()
                    var name = data.user.name
                    var message = data.message
                    var color = data.user.color
                    var image = data.user.image
                    var message_container = document.createElement('div')
                    message_container.setAttribute('class', 'message_container')
                    message_container.setAttribute('data-index',data.index)
                    var message_time = document.createElement('span')
                    message_time.setAttribute('class','message_time')
                    message_time.innerText = `${data.messageTime.messageDate.day+","+data.messageTime.messageDate.month == d.getDate()+","+months[d.getMonth()]?'Today':(data.messageTime.messageDate.day+","+data.messageTime.messageDate.month == d.getDate()-1+","+months[d.getMonth()]?'Yesterday':data.messageTime.messageDate.day+","+data.messageTime.messageDate.month)}  at ${data.messageTime.hour<10?"0"+data.messageTime.hour:(data.messageTime.hour>12?"0"+(data.messageTime.hour-12):data.messageTime.hour)}:${data.messageTime.minutes<10?"0"+data.messageTime.minutes:data.messageTime.minutes} ${data.messageTime.hour>11?"PM":"AM"}`;
                    var message_inner_container = document.createElement('div')
                    message_inner_container.setAttribute('class', 'message_inner_container')
                    var message_content = document.createElement('p')
                    var message_content_container = document.createElement('div')
                    var user_image = document.createElement('img')
                    user_image.setAttribute('class','user_image')
                    user_image.style.display = 'block'
                    image == ""?user_image.src = 'user.webp': user_image.src = image;
                    user_image.onerror = (e)=>{e.target.src = 'user.webp';user_image.onerror = null}
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
                        repliedToMessage.innerHTML = "reply: "+data.reply.message
                        repliedTo.append(repliedToMessage)
                        message_container.append(repliedTo)
                        repliedTo.addEventListener('click',()=>{
                            let realMessage = document.querySelector(`.message_container[data-index="${data.reply.index}"]`)
                            if(realMessage == undefined){
                                window.alert('This Message was Deleted')
                            }else{
                                realMessage.scrollIntoView({behavior: 'smooth'})
                                realMessage.ariaPressed
                                document.querySelectorAll('.message_container').forEach((e)=>{
                                    e.classList.remove('active_real_message')
                                })
                                realMessage.classList.add('active_real_message')
                            }
                            window.onclick = (event)=>{repliedTo.contains(event.target)?false:document.querySelectorAll('.message_container').forEach((e)=>{e.classList.remove('active_real_message')});}
                        })
                        if(data.user.uid == auth.currentUser.uid){
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
                        if(message_container.nextSibling != null && message_container.nextSibling.childNodes[5] != null){
                            if(message_container.nextSibling.childNodes[5].classList.contains('repliedTo')){
                                message_container.style.marginBottom = '45px'
                            }
                        }
                        window.addEventListener('click',(event)=>{
                            if(message_container.contains(event.target)){
                                false
                            }else{
                                hideMessageTime(message_container)
                                if(message_container.nextSibling != null && message_container.nextSibling.childNodes[5] != null){
                                    if(message_container.nextSibling.childNodes[5].classList.contains('repliedTo')){
                                        message_container.style.marginBottom = '0px'
                                    }
                                }
                            }
                        })
                        if(data.user.uid == auth.currentUser.uid){
                            message_container.childNodes[3].style.right = '-32px'
                            message_container.childNodes[3].style.opacity = '1'
                            message_container.childNodes[3].style.zIndex = '0'
                            if(message_container.previousSibling != null){
                                if(message_container.previousSibling.childNodes[1].firstChild.firstChild.innerText == data.user.name && message_container.previousSibling.childNodes[1].firstChild.firstChild.style.color == message_user.style.color){
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
                    if(data.user.uid == auth.currentUser.uid){
                        message_container.style.marginLeft = 'initial'
                        message_container.style.borderBottomLeftRadius = '15px'
                        message_container.style.backgroundColor = '#D64045'
                        message_content.style.color = 'white'
                        message_container.childNodes[2].style.left = '-10px'
                    }else{
                        message_container.style.borderBottomRightRadius = '15px'
                    }
                    if(message_container.previousSibling != null){
                        if(message_container.previousSibling.childNodes[1].firstChild.firstChild.innerText == data.user.name && message_container.previousSibling.childNodes[1].firstChild.firstChild.style.color == message_user.style.color){
                            message_container.style.paddingLeft = '20px'
                            message_container.childNodes[3].style.top = '7px'
                            message_container.childNodes[3].style.borderBottomLeftRadius = '50%'
                            message_container.childNodes[4].style.bottom = '10px'
                            message_container.childNodes[4].style.borderTopLeftRadius = '50%'
                            if(data.user.uid == auth.currentUser.uid){
                                message_container.style.borderTopLeftRadius = '15px'
                                message_container.style.borderBottomLeftRadius = '40px'
                            }else{
                                message_container.style.borderTopRightRadius = '15px'
                                message_container.style.borderBottomRightRadius = '40px'
                            }
                            user_image.style.display = 'none'
                            message_user_container.style.display = 'none'
                            if(message_container.previousSibling.childNodes[1].firstChild.style.display == 'none'){
                                if(data.user.uid == auth.currentUser.uid){
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
                            if(data.user.uid == auth.currentUser.uid){
                                db.ref(`Rooms/${chatName}/messages/message_${data.index}`).update({
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
                }
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
auth.onAuthStateChanged((user)=>{
    if(user == null){
        app.home()
    }else{
        if(localStorage.room == undefined){
            localStorage.setItem('room',"Global")
        }
        document.body.innerHTML = '';
        app.chat(localStorage.room);
    }
})
}
