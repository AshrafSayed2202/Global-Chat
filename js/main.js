import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js'
import { getStorage, ref as ref2, uploadBytes, getDownloadURL, listAll, deleteObject} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js'
import { initializeAppCheck, ReCaptchaV3Provider } from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-app-check.js'
import { getDatabase ,ref ,set ,onValue, onChildRemoved, update, remove} from 'https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js'
const firebaseConfig = {
    apiKey: "AIzaSyCjxJ4TxSjngUdYHuZqEjvlomQVN2OOLqU",
    authDomain: "global-chat-cb729.firebaseapp.com",
    projectId: "global-chat-cb729",
    storageBucket: "global-chat-cb729.appspot.com",
    messagingSenderId: "7814295286",
    appId: "1:7814295286:web:da5d1756080bb7d86c46d7"
};
const firebaseApp = initializeApp(firebaseConfig)
var db = getDatabase(firebaseApp)
var auth = getAuth(firebaseApp)
var storage = getStorage(firebaseApp)
var appCheck = initializeAppCheck(firebaseApp,{
    provider: new ReCaptchaV3Provider('6LdVyO0hAAAAABa0PDdZ20UCcGvB20K2X_djclnA'),
    isTokenAutoRefreshEnabled: true
});
window.onload = function() {
    class GLOBAL_CHAT{
        home(){
        document.body.innerHTML = ''
        this.create_join_form()
        }
        chat(chatName){
        this.create_chat(chatName)
        this.create_profile()
        }
        create_join_form(){
        var parent = this;
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
                sendPasswordResetEmail(auth,reset_password_input.value)
                .then(()=>{
                    closeForgetPassword()
                    createMainAlert(`<i class="fa-solid fa-check icon"></i>`,'Success',`Reset password mail sent to <span style="font-weight:bold">${reset_password_input.value}</span><br>(don't forget to check your spam)`,`green`)
                })
                .catch((error)=>{
                    createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`${error.message}`,`red`)
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
                    signInWithEmailAndPassword(auth,sign_in_user_input.value, sign_in_password_input.value)
                    .then((userCredential) => {
                        var user = userCredential.user;
                        if(!user.emailVerified){
                            signOut(auth)
                            parent.home()
                            setTimeout(() => {
                                createMainAlert(`<i class="fa-solid fa-envelope icon"></i>`,'Verify your Account first',`Don\'t forget to check your spam folder`,`#9c36b5`)
                            }, 500);
                        }
                    })
                    .catch((error) => {
                        createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`${error.message}`,`red`)
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
        sign_up_user_input.oninput = ()=>{if(sign_up_user_input.value.length >= 5){sign_up_user_input_field.style.border = "3px solid green"}else{sign_up_user_input_field.style.border = '2px solid #d64045'}}
        var sign_up_color_input = document.createElement('input')
        sign_up_color_input.setAttribute('class','color-input')
        sign_up_color_input.type = 'color'
        sign_up_color_input.value = '#ffb317'
        sign_up_user_input_field.append(sign_up_color_input,sign_up_user_input)
        var sign_up_image_input_field = document.createElement('div')
        sign_up_image_input_field.setAttribute('class','input-field optional')
        sign_up_image_input_field.innerHTML = `<i class="fa-solid fa-camera"></i>`
        var sign_up_image_input = document.createElement('input')
        sign_up_image_input.type = 'file'
        sign_up_image_input.accept = 'image/*'
        sign_up_image_input.style.display = 'none'
        
        var sign_up_image_label = document.createElement('label')
        sign_up_image_label.textContent = 'Upload Image'
        sign_up_image_label.setAttribute('class','sign_up_image_label')
        sign_up_image_input.onchange = (e)=>{
            sign_up_image_label.textContent = e.target.files[0].name
            }
        sign_up_image_label.append(sign_up_image_input)
        sign_up_image_input_field.append(sign_up_image_label)
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
            if(sign_up_user_input.value.length >= 5){
                if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sign_up_email_input.value)){
                    if( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(sign_up_password_input.value)){
                        if(sign_up_confirm_password_input.value == sign_up_password_input.value){
                            createUserWithEmailAndPassword(auth,sign_up_email_input.value,sign_up_password_input.value).then((cred)=>{
                                var storageRef = ref2(storage)
                                var userImageRef = ref2(storage,`users/${cred.user.uid}/profileImage.jpg`)
                                uploadBytes(userImageRef,sign_up_image_input.files[0]).then((e)=>{
                                    getDownloadURL(ref2(storage,`users/${cred.user.uid}/profileImage.jpg`)).then((url)=>{
                                        set(ref(db,`users/${cred.user.uid}`),{
                                            image:url,
                                            name:sign_up_user_input.value,
                                            email:sign_up_email_input.value,
                                            color:sign_up_color_input.value,
                                            bio:'',
                                            rooms:["Global"]
                                        })
                                    }).then(()=>{
                                        sendEmailVerification(auth.currentUser).then(()=>{
                                            signOut(auth)
                                            parent.home()
                                            setTimeout(() => {
                                                createMainAlert(`<i class="fa-solid fa-envelope icon"></i>`,'Verify your Account ',`We have sent you a verification link,<br>Don\'t forget to check your spam folder`,`#8bc34a`)
                                            }, 500);
                                        })
                                    })
                                })
                            }).catch(function(error){
                                createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`${error.message}`,`red`)
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
        left_panel_img.src = 'media/signin.svg'
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
        right_panel_img.src = 'media/signup.svg'
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
        create_chat(chatName){
            onValue(ref(db,`users/${auth.currentUser.uid}/rooms`),(e)=>{
                if(!e.val().includes(chatName)){
                    localStorage.setItem('room','Global')
                    document.getElementById('chat_container').remove()
                    parent.create_chat('Global')
                }
            },{onlyOnce:true})
            var parent = this;
            var chat_container = document.createElement('div')
            chat_container.setAttribute('id', 'chat_container')
            var chat_inner_container = document.createElement('div')
            chat_inner_container.setAttribute('id', 'chat_inner_container')
            var chat_content_container = document.createElement('div')
            chat_content_container.setAttribute('id', 'chat_content_container')
            chat_content_container.onscroll = (e)=>{
                if(chat_content_container.scrollTop == 0){
                    parent.load_more(chatName)
                }
                if(chat_content_container.scrollTop <= chat_content_container.scrollHeight - chat_content_container.offsetHeight - 500){
                    scroll_bot.style.right = '4%'
                    scroll_bot.style.opacity = '1'
                }else{
                    scroll_bot.style.right = '-10%'
                    scroll_bot.style.opacity = '0'
                }
            }
            var scroll_bot = document.createElement('span')
            scroll_bot.setAttribute('class','scroll-to-bot')
            scroll_bot.innerHTML = `<i class="fa-solid fa-angle-down"></i>`
            scroll_bot.onclick = ()=>{
                chat_content_container.scrollTo({
                    top:chat_content_container.scrollHeight,
                    behavior:'smooth'
                })
            }
            var chat_name_container = document.createElement('div')
            chat_name_container.setAttribute('class','chat_name_container')
            chat_name_container.textContent = chatName
            var chat_input_container = document.createElement('div')
            chat_input_container.setAttribute('id', 'chat_input_container')
            var chat_input_send = document.createElement('button')
            chat_input_send.setAttribute('id', 'chat_input_send')
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`
            var chat_image_upload = document.createElement('input')
            chat_image_upload.type = 'file'
            chat_image_upload.style.display = 'none'
            chat_image_upload.accept = 'image/*'
            chat_image_upload.onchange = (e)=>{
                var messageRef = ref2(storage,`Rooms/${chatName}/${e.target.files[0].size}${e.target.files[0].name}`)
                uploadBytes(messageRef,e.target.files[0]).then((cred)=>{
                    getDownloadURL(ref2(storage,`Rooms/${chatName}/${e.target.files[0].size}${e.target.files[0].name}`)).then((url)=>{
                        var messageImageHTML = `<img style="width: 100%;border-radius: 15px;border: 2px dashed #ff9800;" src="${url}">`
                        parent.create_load('chat_content_container')
                        parent.send_message(messageImageHTML,chatName)
                        deleteReplyMessage()
                    })
                })
            }
            var chat_image_upload_label = document.createElement('label')
            chat_image_upload_label.innerHTML = '<i class="fa-solid fa-image"></i>'
            chat_image_upload_label.id = 'chat_image_upload_label'
            chat_image_upload_label.append(chat_image_upload)
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
                    parent.send_message(chat_input.value,chatName)
                    chat_input.value = ''
                    chat_input.focus()
                    deleteReplyMessage()
                }
            }
            chat_input_container.append(scroll_bot,chat_input,chat_image_upload_label,chat_input_send)
            chat_inner_container.append(chat_name_container, chat_content_container, chat_input_container)
            if (chatName != 'Global') {
                chat_name_container.classList.add('active')
                chat_name_container.addEventListener('click',()=>{
                    chat_name_container.classList.toggle('clicked')
                })
                var members_container_btn = document.createElement('span')
                members_container_btn.setAttribute('class', 'members_container_btn header_btn')
                members_container_btn.innerHTML = `Members <i style="margin-left:5px;" class="fa-solid fa-user-group"></i>`
                members_container_btn.addEventListener('click',()=>{
                    closeOtherProfile()
                    members_container.classList.toggle('active')
                })
                var members_container = document.createElement('div')
                members_container.setAttribute('class', 'members_container')
                var close_members_btn = document.createElement('span')
                close_members_btn.setAttribute('class','close_members_btn')
                close_members_btn.innerHTML = `<i class="fa-solid fa-angle-left"></i>`
                close_members_btn.addEventListener('click',closeMembers)
                var admins_list = document.createElement('div')
                admins_list.setAttribute('class','members_list')
                admins_list.id = 'admin_list'
                var members_list = document.createElement('div')
                members_list.setAttribute('class','members_list')
                members_list.id = 'members_list'
                onValue(ref(db,`Rooms/${chatName}`),(room)=>{
                    var admin =  room.val().admin
                    if(auth.currentUser.uid == admin){
                        var change_room_password = document.createElement('span')
                        change_room_password.setAttribute('class','change_password_btn header_btn')
                        change_room_password.innerHTML = `<i class="fa-solid fa-lock"></i>`
                        change_room_password.addEventListener('click',()=>{
                            window.onkeyup = (e)=>{if(e.key == 'Escape'){closeChangePassword()}}
                            var change_password_container = document.createElement('div')
                            change_password_container.setAttribute('class','popup_container')
                            var change_password = document.createElement('div')
                            change_password.setAttribute('class','popup_window')
                            var change_password_text = document.createElement('p')
                            change_password_text.setAttribute('class','popup_text')
                            change_password_text.innerHTML = `Enter <b style="color:#ffeb3b;">${chatName}</b> Room new Password`
                            var change_password_buttons = document.createElement('div')
                            change_password_buttons.setAttribute('class','popup_buttons')
                            var change_password_inputs = document.createElement('div')
                            var change_password_input_field = document.createElement('div')
                            change_password_input_field.style.width = '80%'
                            change_password_input_field.style.margin = '20px auto'
                            change_password_input_field.setAttribute('class','input-field')
                            var change_password_input = document.createElement('input')
                            change_password_input.type = 'password'
                            change_password_input.placeholder = 'New Password'
                            change_password_input.style.width = '80%'
                            change_password_input.style.flex = 'none'
                            change_password_input.style.margin = 'auto'
                            change_password_input.oninput = ()=>{if(change_password_input.value.length >= 6){change_password_input_field.style.border = '3px solid green'}else{change_password_input_field.style.border = '2px solid #d64045'}}
                            change_password_input_field.append(change_password_input)
                            var change_password_confirm_input_field = document.createElement('div')
                            change_password_confirm_input_field.style.width = '80%'
                            change_password_confirm_input_field.style.margin = '20px auto'
                            change_password_confirm_input_field.setAttribute('class','input-field')
                            var change_password_confirm_input = document.createElement('input')
                            change_password_confirm_input.type = 'password'
                            change_password_confirm_input.placeholder = 'Confirm New Password'
                            change_password_confirm_input.style.width = '80%'
                            change_password_confirm_input.style.flex = 'none'
                            change_password_confirm_input.style.margin = 'auto'
                            change_password_confirm_input.oninput = ()=>{if(change_password_confirm_input.value == change_password_input.value){change_password_confirm_input_field.style.border = '3px solid green'}else{change_password_confirm_input_field.style.border = '2px solid #d64045'}}
                            var confirm_change_password = document.createElement('button')
                            confirm_change_password.setAttribute('class','popup_button_cancel')
                            confirm_change_password.onclick = ()=>{
                                if(change_password_input.value.length >= 6){
                                    if(change_password_confirm_input.value == change_password_input.value){
                                        update(ref(db,`Rooms/${chatName}`),{
                                            password:change_password_input.value
                                        })
                                        closeChangePassword()
                                    }else{
                                        change_password_confirm_input.focus()
                                        change_password_confirm_input_field.style.border = '3px solid red'
                                    }
                                }else{
                                    change_password_input.focus()
                                    change_password_input_field.style.border = '3px solid red'
                                }
                            }
                            confirm_change_password.textContent = 'Confirm'
                            var cancel_change_password = document.createElement('button')
                            cancel_change_password.setAttribute('class','popup_button_confirm')
                            cancel_change_password.textContent = 'Cancel'
                            cancel_change_password.onclick = ()=>{
                                closeChangePassword()
                            }
                            change_password_buttons.append(confirm_change_password,cancel_change_password)
                            change_password_confirm_input_field.append(change_password_confirm_input)
                            change_password_inputs.append(change_password_input_field,change_password_confirm_input_field)
                            change_password.append(change_password_text,change_password_inputs,change_password_buttons)
                            change_password_container.append(change_password)
                            document.body.append(change_password_container)
                            function closeChangePassword(){
                                change_password_container.style.opacity = '0'
                                setTimeout(()=>{change_password_container.remove()},300)
                            }
                            setTimeout(() => {
                                change_password_container.style.opacity = '1'
                            },0);
                        })
                        chat_name_container.append(change_room_password)
                    }
                    onValue(ref(db,`users/${admin}`),(admin_user)=>{
                        var admin_container = document.createElement('div')
                        admin_container.setAttribute('class','user_container')
                        if(auth.currentUser.uid != admin){
                            admin_container.onmouseenter = ()=>{admin_container.style.paddingRight = '40px'}
                            admin_container.onmouseleave = ()=>{admin_container.style.paddingRight = '0px'}
                            var view_profile = document.createElement('span')
                            view_profile.setAttribute('class','view_profile')
                            view_profile.innerHTML = `<i class="fa-solid fa-circle-user"></i>`
                            view_profile.addEventListener('click',()=>{
                                if(auth.currentUser.uid != admin){
                                    showOthersProfile(admin)
                                    closeMembers()
                                }
                            })
                            admin_container.append(view_profile)
                        }
                        var admin_image = document.createElement('img')
                        admin_image.setAttribute('class','member_image')
                        admin_image.src = admin_user.val().image
                        admin_image.onerror = (e)=>{e.target.src = 'media/user.webp';admin_image.onerror = null}
                        admin_image.style.border = `2px dashed ${admin_user.val().color}`
                        var member_image_holder = document.createElement('div')
                        member_image_holder.style.border = `2px dashed ${admin_user.val().color}`
                        member_image_holder.setAttribute('class','member_image_holder')
                        member_image_holder.append(admin_image)
                        var admin_name = document.createElement('p')
                        admin_name.textContent = `👑${admin_user.val().name}👑`
                        admin_name.setAttribute('class','member_name')
                        admin_container.append(member_image_holder,admin_name)
                        admins_list.append(admin_container)
                    },{onlyOnce:true})
                    onValue(ref(db,`Rooms/${chatName}/Members`),(members)=>{
                        members_list.innerHTML = ''
                        members = members.val()
                        for(let i=1;i<members.length;i++){
                            onValue(ref(db,`users/${members[i]}`),(member)=>{
                                member = member.val()
                                var member_container = document.createElement('div')
                                member_container.setAttribute('class','user_container')
                                if(auth.currentUser.uid != members[i]){
                                    member_container.onmouseenter = ()=>{member_container.style.paddingRight = '50px'}
                                    member_container.onmouseleave = ()=>{member_container.style.paddingRight = '0px'}
                                    var view_profile = document.createElement('span')
                                    view_profile.setAttribute('class','view_profile')
                                    view_profile.innerHTML = `<i class="fa-solid fa-circle-user"></i>`
                                    view_profile.addEventListener('click',()=>{
                                        if(auth.currentUser.uid != members[i]){
                                            showOthersProfile(members[i])
                                            closeMembers()
                                        }
                                    })
                                    member_container.append(view_profile)
                                    if(auth.currentUser.uid == admin){
                                        member_container.onmouseenter = ()=>{member_container.style.paddingRight = '70px'}
                                        member_container.onmouseleave = ()=>{member_container.style.paddingRight = '0px'}
                                        var kick_member = document.createElement('span')
                                        kick_member.setAttribute('class','kick_member')
                                        kick_member.innerHTML = `<i class="fa-solid fa-user-large-slash"></i>`
                                        kick_member.addEventListener('click',()=>{
                                            var kick_member_container = document.createElement('div')
                                            kick_member_container.setAttribute('class','popup_container')
                                            window.onkeyup = (e)=>{if(e.key == 'Escape'){closeKick()}}
                                            var kick_member = document.createElement('div')
                                            kick_member.setAttribute('class','popup_window')
                                            var kick_text = document.createElement('p')
                                            kick_text.setAttribute('class','popup_text')
                                            kick_text.innerHTML = `Want to kick <b style="color:#ffeb3b;">${member.name}</b>?`
                                            var buttons_container = document.createElement('div')
                                            buttons_container.setAttribute('class','popup_buttons')
                                            var button_kick = document.createElement('button')
                                            button_kick.setAttribute('class','popup_button_confirm')
                                            button_kick.innerText = 'Kick'
                                            button_kick.onclick = function(){
                                                onValue(ref(db,`Rooms/${chatName}/Members`),(membersObj)=>{
                                                    membersObj = membersObj.val()
                                                    remove(ref(db,`Rooms/${chatName}/Members/${membersObj.indexOf(members[i])}`))
                                                },{onlyOnce:true})
                                                closeKick()
                                            }
                                            var button_keep = document.createElement('button')
                                            button_keep.setAttribute('class','popup_button_cancel')
                                            button_keep.innerText = 'Keep'
                                            button_keep.onclick = function(){
                                                closeKick()
                                            }
                                            buttons_container.append(button_kick,button_keep)
                                            kick_member.append(kick_text)
                                            kick_member.append(buttons_container)
                                            kick_member_container.append(kick_member)
                                            document.body.append(kick_member_container)
                                            function closeKick(){
                                                kick_member_container.style.opacity = '0'
                                                setTimeout(()=>{kick_member_container.remove()},300)
                                            }
                                            setTimeout(() => {
                                                kick_member_container.style.opacity = '1'
                                            },0);
                                        })
                                        member_container.append(kick_member)
                                    }
                                }
                                var member_image = document.createElement('img')
                                member_image.setAttribute('class','member_image')
                                member_image.src = member.image
                                member_image.onerror = (e)=>{e.target.src = 'media/user.webp';member_image.onerror = null}
                                var member_image_holder = document.createElement('div')
                                member_image_holder.style.border = `2px dashed ${member.color}`
                                member_image_holder.setAttribute('class','member_image_holder')
                                member_image_holder.append(member_image)
                                var member_name = document.createElement('p')
                                member_name.textContent = `${member.name}`
                                member_name.setAttribute('class','member_name')
                                member_container.append(member_image_holder,member_name)
                                members_list.append(member_container)
                            },{onlyOnce:true})
                        }
                    })
                },{onlyOnce:true})
                var other_profile = document.createElement('div')
                other_profile.setAttribute('class', 'members_container')
                var close_other_profile = document.createElement('span')
                close_other_profile.setAttribute('class','close_members_btn')
                close_other_profile.innerHTML = `<i class="fa-solid fa-angle-left"></i>`
                close_other_profile.addEventListener('click',closeOtherProfile)
                var other_profile_image = document.createElement('img')
                other_profile_image.setAttribute('class','profile_image')
                var other_profile_image_holder = document.createElement('div')
                other_profile_image_holder.setAttribute('class','profile_image_holder')
                other_profile_image_holder.append(other_profile_image)
                var other_profile_name = document.createElement('p')
                other_profile_name.setAttribute('class','profile_name')
                var other_profile_bio = document.createElement('p')
                other_profile_bio.setAttribute('class','profile_bio')
                other_profile.append(other_profile_image_holder,other_profile_name,other_profile_bio,close_other_profile)
                function closeMembers(){
                    members_container.classList.remove('active')
                }
                function closeOtherProfile(){
                    other_profile.classList.remove('active')
                }
                function showOthersProfile(uid){
                    onValue(ref(db,`users/${uid}`),(user)=>{
                        user = user.val()
                        other_profile_image.src = user.image
                        other_profile_image_holder.style.borderColor = user.color
                        other_profile_image.onerror = (e)=>{e.target.src = 'media/user.webp';other_profile_image.onerror = null}
                        other_profile_name.textContent = user.name
                        other_profile_bio.textContent = user.bio
                        other_profile.classList.add('active')
                    },{onlyOnce:true})
                }
                members_container.append(close_members_btn,admins_list,members_list)
                chat_name_container.append(members_container_btn)
                chat_inner_container.append(members_container,other_profile)
            }
            chat_container.append(chat_inner_container)
            document.body.append(chat_container)
            parent.create_load('chat_content_container')
            parent.refresh_chat(chatName)
        }
        create_profile(){
            var parent = this;
            var profile_btn_container = document.createElement('div')
            profile_btn_container.setAttribute('class','profile_btn_container')
            var profile_btn = document.createElement('img')
            profile_btn.onerror = (e)=>{e.target.src = 'media/user.webp';profile_btn.onerror = null}
            var profile_btn_holder = document.createElement('div')
            profile_btn_holder.setAttribute('class','profile_btn_holder')
            profile_btn_holder.append(profile_btn)
            var profile_container = document.createElement('div')
            profile_container.setAttribute('class','aside_container')
            profile_btn_container.onclick = ()=>{
                rooms_container.classList.remove('aside-active')
                profile_container.classList.toggle('aside-active')
            }
            var profile_image_container = document.createElement('div')
            profile_image_container.setAttribute('class','profile_image_container')
            var profile_image = document.createElement('img')
            profile_image.onerror = (e)=>{e.target.src = 'media/user.webp';profile_image.onerror = null}
            profile_image.setAttribute('class','profile_image')
            var profile_image_holder = document.createElement('div')
            profile_image_holder.setAttribute('class','profile_image_holder')
            profile_image_holder.append(profile_image)
            var profile_image_edit_btn = document.createElement('span')
            profile_image_edit_btn.innerHTML = '<i class="fa-solid fa-pen"></i>'
            var upload_new_image_input_field = document.createElement('div')
            upload_new_image_input_field.setAttribute('class','input-field upload_new_image_active')
            var upload_new_image_input = document.createElement('input')
            upload_new_image_input.type = 'file'
            upload_new_image_input.accept = 'image/*'
            upload_new_image_input.style.display = 'none'
            var upload_new_image_label = document.createElement('label')
            upload_new_image_label.setAttribute('class','sign_up_image_label')
            upload_new_image_label.style.paddingLeft = '20px'
            upload_new_image_label.textContent = 'Upload new Image'
            upload_new_image_input.onchange = (e)=>{
                upload_new_image_label.textContent = e.target.files[0].name
            }
            upload_new_image_label.append(upload_new_image_input)
            var new_color_input = document.createElement('input')
            new_color_input.type = 'color'
            new_color_input.setAttribute('class','color-input')
            var update_image_color_submit = document.createElement('span')
            update_image_color_submit.setAttribute('class','update_image_color_submit')
            update_image_color_submit.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
            update_image_color_submit.addEventListener('click',confirmUpdateImage)
            function confirmUpdateImage(){
                    if(upload_new_image_input.files.length == 0){
                        update(ref(db,`users/${auth.currentUser.uid}`),{
                            color:new_color_input.value
                        })
                    }else{
                        var storageRef = ref2(storage)
                                var userImageRef = ref2(storage,`users/${auth.currentUser.uid}/profileImage.jpg`)
                                uploadBytes(userImageRef,upload_new_image_input.files[0]).then((e)=>{
                                    getDownloadURL(ref2(storageRef,`users/${auth.currentUser.uid}/profileImage.jpg`)).then((url)=>{
                                        update(ref(db,`users/${auth.currentUser.uid}`),{
                                            image:url,
                                            color:new_color_input.value
                                        })
                                        upload_new_image_input.value = null
                                    })
                                })
                    }
                    upload_new_image_input_field.classList.add('upload_new_image_active')
            }
            upload_new_image_input_field.append(upload_new_image_label,new_color_input,update_image_color_submit)
            profile_image_edit_btn.addEventListener('click',()=>{
                upload_new_image_input_field.classList.toggle('upload_new_image_active')
            })
            profile_image_container.append(profile_image_edit_btn,profile_image_holder,upload_new_image_input_field)
            var profile_name = document.createElement('p')
            profile_name.setAttribute('class','profile_name')
            var profile_bio = document.createElement('p')
            profile_bio.setAttribute('class','profile_bio')
            var profile_bio_edit_btn = document.createElement('span')
            profile_bio_edit_btn.innerHTML = `<i style="margin-left:5px;" class="fa-solid fa-pen"></i>`
            var profile_bio_edit_confirm = document.createElement('span')
            profile_bio_edit_confirm.innerHTML = `<i style="margin-left:5px;"class="fa-solid fa-circle-check"></i>`
            profile_bio_edit_confirm.style.display = 'none'
            var profile_bio_text = document.createElement('p')
            profile_bio_edit_btn.addEventListener('click',()=>{
                profile_bio_text.setAttribute('contenteditable','true')
                profile_bio_text.style.backgroundColor = 'white'
                profile_bio_text.style.color = 'black'
                profile_bio_text.style.padding = '2px'
                profile_bio_text.onkeydown = (e)=>{
                    if(e.key == 'Enter'){
                        confirmEditBio()
                    }
                    if(profile_bio_text.textContent.length > 150){
                        if(e.key != 'Backspace'&&e.key != 'ArrowRight'&&e.key != 'ArrowLeft'&&e.key != 'ArrowUp'&&e.key != 'ArrowDown'){
                            e.preventDefault()
                        }
                    }
                }
                profile_bio_edit_btn.style.display = 'none'
                profile_bio_edit_confirm.style.display = 'block'
                profile_bio_edit_confirm.addEventListener('click',confirmEditBio)
                function confirmEditBio(){
                    profile_bio_text.setAttribute('contenteditable','false')
                    profile_bio_text.style.backgroundColor = 'transparent'
                    profile_bio_text.style.color = 'white'
                    profile_bio_text.style.padding = '0px'
                    profile_bio_edit_btn.style.display = 'block'
                    profile_bio_edit_confirm.style.display = 'none'
                    update(ref(db,`users/${auth.currentUser.uid}`),{
                        bio:profile_bio_text.textContent
                    })
                }
            })
            profile_bio.append(profile_bio_edit_btn,profile_bio_edit_confirm,profile_bio_text)
            var join_room_btn = document.createElement('div')
            join_room_btn.setAttribute('class','profile_inner_btn')
            join_room_btn.innerHTML = `Private rooms\n<i style="margin-left:5px;" class="fa-solid fa-lock"></i>`
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
                    join_room_name.oninput = ()=>{join_room_name_field.style.border = '2px solid #d64045'}
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
                        onValue(ref(db,`Rooms/`),(rooms_object)=>{
                            if(join_room_name.value.length >= 5){
                                if(rooms_object.val()[`${join_room_name.value}`] != undefined){
                                    var room_password_field = document.createElement('div')
                                room_password_field.setAttribute('class','input-field')
                                room_password_field.style.width = '80%'
                                room_password_field.style.margin = '25px auto'
                                var room_password = document.createElement('input')
                                room_password.type = 'password'
                                room_password.placeholder = 'Room Password'
                                room_password.setAttribute('class','creat_room_input')
                                room_password.oninput = ()=>{room_password_field.style.border = '2px solid #d64045'}
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
                                    onValue(ref(db,`Rooms/${join_room_name.value}`),(room)=>{
                                        if(room_password.value.length >= 5){
                                            if(room_password.value == room.val().password){
                                                onValue(ref(db,`users/${auth.currentUser.uid}`),(user)=>{
                                                    if(user.val().rooms.includes(join_room_name.value)){
                                                        return
                                                    }
                                                    var addedRoom = [join_room_name.value]
                                                    var newRooms = user.val().rooms.concat(addedRoom)
                                                    update(ref(db,`users/${auth.currentUser.uid}`),{
                                                        rooms: newRooms
                                                    })
                                                },{onlyOnce:true})
                                                localStorage.setItem('room',join_room_name.value)
                                                document.getElementById('chat_container').remove()
                                                parent.create_chat(join_room_name.value)
                                                closeJoinRoom()
                                                closeProfile()
                                                if(room.val().Members.includes(auth.currentUser.uid)){
                                                    return
                                                }else{
                                                    var addedMember = [auth.currentUser.uid]
                                                var newMembers = room.val().Members.concat(addedMember)
                                                update(ref(db,`Rooms/${join_room_name.value}`),{
                                                    Members: newMembers
                                                })
                                                }
                                            }else{
                                                createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`Wrong password, try again`,`red`)
                                                room_password.focus()
                                                room_password_field.style.border = '3px solid red'
                                            }
                                        }else{
                                            createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`This password is too damn short bro`,`red`)
                                            room_password.focus()
                                            room_password_field.style.border = '3px solid red'
                                        }
                                    },{onlyOnce:true})
                                }
                                join_buttons.append(room_password_field,confirm_room_create)
                                }else{
                                    createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`This Room Dosn't exist`,`red`)
                                    join_room_name.focus()
                                    join_room_name_field.style.border = '3px solid red'
                                }
                            }else{
                                createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`There is no room with this short name`,`red`)
                                join_room_name.focus()
                                join_room_name_field.style.border = '3px solid red'
                            }
                        },{onlyOnce:true})
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
                    creat_room_name.oninput = ()=>{creat_room_name_field.style.border = '2px solid #d64045'}
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
                        onValue(ref(db,`Rooms/`),(rooms_object)=>{
                            if(creat_room_name.value.length >= 5){
                                if(rooms_object.val()[`${creat_room_name.value}`] == undefined){
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
                                    onValue(ref(db,`Rooms/`),(rooms_object)=>{
                                        if(room_password.value.length >= 5){
                                            if(rooms_object.val()[`${creat_room_name.value}`] == undefined){
                                                set(ref(db,`Rooms/${creat_room_name.value}`),{
                                                    password:room_password.value,
                                                    admin: auth.currentUser.uid
                                                })
                                                onValue(ref(db,`users/${auth.currentUser.uid}`),(user)=>{
                                                    var addedRoom = [creat_room_name.value]
                                                    var newRooms = user.val().rooms.concat(addedRoom)
                                                    update(ref(db,`users/${auth.currentUser.uid}`),{
                                                        rooms: newRooms
                                                    })
                                                user = user.val()
                                                set(ref(db,`Rooms/${creat_room_name.value}/Members`),[auth.currentUser.uid])
                                            },{onlyOnce:true})
                                                localStorage.setItem('room',creat_room_name.value)
                                                document.getElementById('chat_container').remove()
                                                parent.create_chat(creat_room_name.value)
                                                closeJoinRoom()
                                                closeProfile()
                                            }else{
                                                createMainAlert(`<i class="fa-regular fa-face-frown icon"></i>`,'Error',`The room name got used while you setting your password <br> please change it`,`red`)
                                            }
                                        }else{
                                        createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`This password it too short`,`red`)
                                        room_password.focus()
                                        room_password_field.style.border = '3px solid red'
                                        }
                                    },{onlyOnce:true})
                                }
                                join_buttons.append(room_password_field,confirm_room_create)
                                }else{
                                    createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`Room name is already used`,`red`)
                                    creat_room_name.focus()
                                    creat_room_name_field.style.border = '3px solid red'
                                }
                            }else{
                                createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`Room name is too short`,`red`)
                                creat_room_name.focus()
                                creat_room_name_field.style.border = '3px solid red'
                            }
                        },{onlyOnce:true})
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
            var back_to_global = document.createElement('div')
            back_to_global.setAttribute('class','profile_inner_btn')
            back_to_global.innerHTML = `Back to Global Chat\n<i style="animation: rotate 3s linear infinite reverse;margin-left:5px;" class="fa-solid fa-rotate-left"></i>`
            back_to_global.addEventListener('click',()=>{
                document.getElementById('chat_container').remove()
                localStorage.room = 'Global'
                parent.create_chat('Global')
                closeProfile()
            })
            var chat_logout = document.createElement('div')
            chat_logout.setAttribute('class','profile_inner_btn')
            chat_logout.innerHTML = `Sign Out\n<i style="margin-left:5px;" class="fa-solid fa-right-from-bracket"></i>`
            chat_logout.addEventListener('click',()=>{
                var confirm_logout_container = document.createElement('div')
                confirm_logout_container.setAttribute('class','popup_container')
                window.onkeyup = (e)=>{if(e.key == 'Escape'){closeLogout()}}
                var confirm_logout = document.createElement('div')
                confirm_logout.setAttribute('class','popup_window')
                var logout_text = document.createElement('p')
                logout_text.setAttribute('class','popup_text')
                logout_text.innerText = 'Are you sure you want to logout?'
                var buttons_container = document.createElement('div')
                buttons_container.setAttribute('class','popup_buttons')
                var button_logout = document.createElement('button')
                button_logout.setAttribute('class','popup_button_confirm')
                button_logout.innerText = 'Logout'
                button_logout.onclick = function(){
                    auth.signOut().then(()=>{
                    }).catch((error)=>{
                        console.log(error.message);
                    })
                }
                var button_keep = document.createElement('button')
                button_keep.setAttribute('class','popup_button_cancel')
                button_keep.innerText = 'Stay'
                button_keep.onclick = function(){
                    closeLogout()
                }
                buttons_container.append(button_logout,button_keep)
                confirm_logout.append(logout_text)
                confirm_logout.append(buttons_container)
                confirm_logout_container.append(confirm_logout)
                document.body.append(confirm_logout_container)
                function closeLogout(){
                    confirm_logout_container.style.opacity = '0'
                    setTimeout(()=>{confirm_logout_container.remove()},300)
                }
                setTimeout(() => {
                    confirm_logout_container.style.opacity = '1'
                },0);
            })
            var socials = document.createElement('div')
            socials.innerHTML = `<hr style="background:white;height:1px;width:80%;margin:auto;"><p class="get-in-touch">Get in touch with the creator</p><ul>
                <li><a href="https://www.facebook.com/ashraf.tenshi/" title="facebook" target="_blank" rel="noopener"><i class="fa-brands fa-facebook-f"></i></a></li>
                <li><a href="https://github.com/ashraf9932" title="github" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/ashraf-sayed22/" title="linkedin" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin-in"></i></a></li>
                <li><a href="mailto:ashraf.neizk@gmail.com" title="mail" target="_blank"><i class="fa-brands fa-google"></i></a></li>
                </ul>`
            var close_profile = document.createElement('span')
            close_profile.setAttribute('class','close_aside')
            close_profile.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
            close_profile.addEventListener('click',closeProfile)
            function closeProfile(){
                profile_container.classList.remove('aside-active')
            }
            var profile_buttons = document.createElement('div')
            profile_btn_container.append(profile_btn_holder)
            var rooms_btn = document.createElement('div')
            rooms_btn.setAttribute('class','profile_inner_btn')
            rooms_btn.innerHTML = 'ROOMS<i style="margin-left:5px;" class="fa-solid fa-layer-group"></i>'
            rooms_btn.addEventListener('click',()=>{
                profile_container.classList.remove('aside-active')
                rooms_container.classList.toggle('aside-active')
            })
            profile_buttons.append(join_room_btn,rooms_btn,back_to_global,chat_logout)
            profile_container.append(profile_image_container,profile_name,profile_bio,profile_buttons,socials,close_profile)
            var rooms_container = document.createElement('div')
            rooms_container.setAttribute('class','aside_container')
            var my_rooms = document.createElement('div')
            my_rooms.setAttribute('class','rooms_list')
            my_rooms.id = 'my_rooms'
            var joined_rooms = document.createElement('div')
            joined_rooms.setAttribute('class','rooms_list')
            joined_rooms.id = 'joined_rooms'
            var close_rooms = document.createElement('span')
            close_rooms.setAttribute('class','close_aside')
            close_rooms.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
            close_rooms.addEventListener('click',closeRooms)
            function closeRooms(){
                rooms_container.classList.remove('aside-active')
            }
            onValue(ref(db,`users/${auth.currentUser.uid}/rooms`),(e)=>{
                my_rooms.innerHTML = ''
                joined_rooms.innerHTML = ''
                var rooms = Object.values(e.val());
                for(let i=1;i<rooms.length;i++){
                    onChildRemoved(ref(db,`Rooms/${rooms[i]}/Members`),(removedMember)=>{
                        removedMember = removedMember.val()
                        if(removedMember == auth.currentUser.uid){
                            if(localStorage.room == rooms[i]){
                                localStorage.setItem('room','Global')
                                document.getElementById('chat_container').remove()
                                parent.create_chat('Global')
                            }
                            onValue(ref(db,`users/${auth.currentUser.uid}/rooms`),(roomsObj)=>{
                                roomsObj = roomsObj.val()
                                for(var k in rooms){
                                    if(rooms[i]==rooms[k]){
                                        remove(ref(db,`users/${auth.currentUser.uid}/rooms/${k}`))
                                    }
                                }
                            },{onlyOnce:true})
                        }
                    })
                    onValue(ref(db,`Rooms/${rooms[i]}`),(room)=>{
                        var room_container = document.createElement('div')
                        room_container.textContent = rooms[i]
                        room_container.setAttribute('class','room_container')
                        room_container.onclick = ()=>{room_container.classList.toggle('active')}
                        window.addEventListener('click',(event)=>{if(room_container.contains(event.target)){false}else{room_container.classList.remove('active')}})
                        var delete_room = document.createElement('span')
                        delete_room.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
                        delete_room.setAttribute('class','room_red_btn')
                        delete_room.addEventListener('click',()=>{
                            window.onkeyup = (e)=>{if(e.key == 'Escape'){closeDeleteRoom()}}
                            var delete_room_container = document.createElement('div')
                            delete_room_container.setAttribute('class','popup_container')
                            var delete_room_window = document.createElement('div')
                            delete_room_window.setAttribute('class','popup_window')
                            var delete_room_text = document.createElement('p')
                            delete_room_text.setAttribute('class','popup_text')
                            delete_room_text.innerHTML = `Are you sure you want to Delete <b style="color:#ffeb3b">${rooms[i]}</b> room?`
                            var delete_room_buttons = document.createElement('div')
                            delete_room_buttons.setAttribute('class','popup_buttons')
                            var confirm_delete_room = document.createElement('button')
                            confirm_delete_room.setAttribute('class','popup_button_confirm')
                            confirm_delete_room.textContent = 'Delete'
                            confirm_delete_room.onclick = ()=>{
                                var storageRef = ref2(storage);
                                var imagesRef = ref2(storage,`Rooms/${rooms[i]}`);
                                listAll(imagesRef)
                                .then((res)=>{
                                    res.items.forEach((itemRef)=>{
                                        var deleteRef = ref2(storage,`Rooms/${rooms[i]}/${itemRef.name}`)
                                        deleteObject(deleteRef).then(()=>{
                                        }).catch((error)=>{
                                            console.log(error.message);
                                        })
                                    })
                                }).catch((error) => {
                                    console.log(error.message);
                                });
                                remove(ref(db,`Rooms/${rooms[i]}`))
                                closeDeleteRoom()
                                closeRooms()
                            }
                            var cancel_delete_room = document.createElement('button')
                            cancel_delete_room.setAttribute('class','popup_button_cancel')
                            cancel_delete_room.textContent = 'Cancel'
                            cancel_delete_room.onclick = closeDeleteRoom
                            delete_room_buttons.append(confirm_delete_room,cancel_delete_room)
                            delete_room_window.append(delete_room_text,delete_room_buttons)
                            delete_room_container.append(delete_room_window)
                            document.body.append(delete_room_container)
                            setTimeout(() => {
                                delete_room_container.style.opacity = '1'
                            }, 0);
                            function closeDeleteRoom(){
                                delete_room_container.style.opacity = '0'
                                setTimeout(()=>{delete_room_container.remove()},300)
                            }
                        })
                        var enter_room = document.createElement('span')
                        enter_room.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i>`
                        enter_room.setAttribute('class','enter_room_btn')
                        enter_room.addEventListener('click',()=>{
                            localStorage.setItem('room',rooms[i])
                            document.getElementById('chat_container').remove()
                            parent.create_chat(rooms[i])
                            closeRooms()
                        })
                        var leave_room = document.createElement('span')
                        leave_room.innerHTML = `<i class="fa-solid fa-door-closed"></i>`
                        leave_room.setAttribute('class','room_red_btn')
                        leave_room.onmouseenter = ()=>{leave_room.innerHTML = `<i class="fa-solid fa-door-open"></i>`}
                        leave_room.onmouseleave  = ()=>{leave_room.innerHTML = `<i class="fa-solid fa-door-closed"></i>`}
                        leave_room.addEventListener('click',()=>{
                            window.onkeyup = (e)=>{if(e.key == 'Escape'){closeLeaveRoom()}}
                            var leave_room_container = document.createElement('div')
                            leave_room_container.setAttribute('class','popup_container')
                            var leave_room_window = document.createElement('div')
                            leave_room_window.setAttribute('class','popup_window')
                            var leave_room_text = document.createElement('p')
                            leave_room_text.setAttribute('class','popup_text')
                            leave_room_text.innerHTML = `Are you sure you want to Leave <b style="color:#ffeb3b">${rooms[i]}</b> room?`
                            var leave_room_buttons = document.createElement('div')
                            leave_room_buttons.setAttribute('class','popup_buttons')
                            var confirm_leave_room = document.createElement('button')
                            confirm_leave_room.setAttribute('class','popup_button_confirm')
                            confirm_leave_room.textContent = 'Leave'
                            confirm_leave_room.onclick = ()=>{
                                onValue(ref(db,`Rooms/${rooms[i]}/Members`),(members)=>{
                                    members = members.val()
                                    remove(ref(db,`Rooms/${rooms[i]}/Members/${members.indexOf(auth.currentUser.uid)}`))
                                },{onlyOnce:true})
                                document.getElementById('chat_container').remove()
                                parent.create_chat('Global')
                                closeLeaveRoom()
                                closeRooms()
                            }
                            var cancel_leave_room = document.createElement('button')
                            cancel_leave_room.setAttribute('class','popup_button_cancel')
                            cancel_leave_room.textContent = 'Cancel'
                            cancel_leave_room.onclick = closeLeaveRoom
                            leave_room_buttons.append(confirm_leave_room,cancel_leave_room)
                            leave_room_window.append(leave_room_text,leave_room_buttons)
                            leave_room_container.append(leave_room_window)
                            document.body.append(leave_room_container)
                            setTimeout(() => {
                                leave_room_container.style.opacity = '1'
                            }, 0);
                            function closeLeaveRoom(){
                                leave_room_container.style.opacity = '0'
                                setTimeout(()=>{leave_room_container.remove()},300)
                            }
                        })
                        room_container.append(enter_room)
                            if(room.val().admin == auth.currentUser.uid){
                                room_container.classList.add('my_room_container')
                                room_container.append(delete_room)
                                my_rooms.append(room_container)
                            }else{
                                room_container.classList.add('joined_room_container')
                                room_container.append(leave_room)
                                joined_rooms.append(room_container)
                            }
                        },{onlyOnce:true})
                }
            })
            onValue(ref(db,`users/${auth.currentUser.uid}`),(user)=>{
                user = user.val()
                profile_btn.src = user.image
                profile_btn.onerror = (e)=>{e.target.src = 'media/user.webp';profile_btn.onerror = null}
                profile_image.src = user.image
                profile_image.onerror = (e)=>{e.target.src = 'media/user.webp';profile_image.onerror = null}
                profile_image_holder.style.borderColor = user.color
                new_color_input.value = user.color
                profile_name.textContent = user.name
                user.bio == ''?profile_bio_text.textContent = 'Nothing':profile_bio_text.textContent = user.bio;
            })
            rooms_container.append(my_rooms,joined_rooms,close_rooms)
            document.body.append(profile_btn_container,rooms_container,profile_container)
        }
        send_message(message,chatName){
            var parent = this
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
            onValue(ref(db,`users/${auth.currentUser.uid}`),(user)=>{
                user = user.val()
                onValue(ref(db,`Rooms/${chatName}/messages`),function(message_object) {
                    if(message_object.val() == null){
                        var index = 1
                    }else{
                        var index = Object.values(message_object.val()).length + 1
                    }
                    let d = new Date();
                    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    set(ref(db,`Rooms/${chatName}/messages/message_${index}`),{
                        user: {
                            uid: auth.currentUser.uid,
                            name: user.name,
                            color: user.color,
                            image: user.image
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
                },{onlyOnce:true})
            },{onlyOnce:true})
            chat_content_container.scrollTo({
                top:chat_content_container.scrollHeight,
                behavior:'smooth'
            })
        }
        refresh_chat(chatName){
            var chat_content_container = document.getElementById('chat_content_container')
            onValue(ref(db,`Rooms/${chatName}/messages`),function(messages_object) {
                if(document.querySelector('.loader_container') != null){
                    document.querySelector('.loader_container').remove()
                }
                if(messages_object.val() == null){
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
                newOrdered.forEach((e)=>{createMessage(e,false,chatName)})
                if(chat_content_container.scrollTop  >= chat_content_container.scrollHeight - chat_content_container.offsetHeight - 500){
                    chat_content_container.scrollTo({
                        top:chat_content_container.scrollHeight,
                        behavior:'smooth'
                    })
                }
            })
        }
        load_more(chatName){
            onValue(ref(db,`Rooms/${chatName}/messages`),(messages_object)=>{
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
                var end = document.getElementById('chat_content_container').childNodes[0].dataset.index
                var start;
                if(end < 50){
                    start = 0
                }else if(end >= 50){
                    start = end - 50
                }
                var newOrdered = ordered.slice(start,end).reverse()
                newOrdered.forEach((e)=>{createMessage(e,true,chatName)})
                if(end != 1){
                    document.querySelector(`.message_container[data-index="${end}"]`).scrollIntoView()
                }
            },{onlyOnce:true})
        }
    }
    function createMessage(data,scroll,chatName){
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
        image == ""?user_image.src = 'media/user.webp': user_image.src = image;
        user_image.onerror = (e)=>{e.target.src = 'media/user.webp';user_image.onerror = null}
        user_image.style.borderColor = `${color}`
        var user_image_holder = document.createElement('div')
        user_image_holder.setAttribute('class','user_image_holder')
        user_image_holder.style.display = 'block'
        user_image_holder.append(user_image)
        var message_user_container = document.createElement('div')
        message_user_container.style.display = 'block'
        message_user_container.setAttribute('class', 'message_user_container')
        var message_user = document.createElement('p')
        message_user.setAttribute('class', 'message_user')
        message_user.setAttribute('data-user',data.user.uid)
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
        message_container.append(user_image_holder)
        message_content_container.setAttribute('class', 'message_content_container')
        message_content.setAttribute('class', 'message_content')
        if(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(message) && message.startsWith('<img') == false && message.startsWith('<iframe') == false){
            if(message.startsWith('http')){
                message_content.innerHTML = `<a style="color: #45f6ff;" target="_blank" href="${message}">${message}</a>`
            }else{
                message_content.innerHTML = `<a style="color: #45f6ff;" target="_blank" href="http://${message}">${message}</a>`
            }
        }else{
            message_content.innerHTML = message
        }
        message_content_container.append(message_content)
        message_inner_container.append(message_content_container)
        message_container.append(message_inner_container)
        message_container.append(message_time)
        message_container.append(message_deletebtn)
        message_container.append(message_replybtn)
        if(data.reply != undefined){
            var repliedTo = document.createElement('div')
            var repliedToMessage = document.createElement('p')
            repliedToMessage.setAttribute('class','repliedTo-message')
            repliedTo.setAttribute('class','repliedTo')
            if(data.reply.message.startsWith('<img')){
                repliedToMessage.style.width = '50px'
                message_container.style.marginTop = '70px'
                repliedToMessage.innerHTML = data.reply.message
            }else{
                message_container.style.marginTop = '30px'
                repliedToMessage.innerHTML = "reply: "+data.reply.message
            }
            repliedTo.append(repliedToMessage)
            message_container.append(repliedTo)
            repliedTo.addEventListener('click',()=>{
                let realMessage = document.querySelector(`.message_container[data-index="${data.reply.index}"]`)
                if(realMessage == undefined){
                    createMainAlert(`<i class="fa-solid fa-exclamation icon"></i>`,'Error',`This message has ben deleted`,`red`)
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
        if(scroll){
            chat_content_container.insertBefore(message_container,chat_content_container.firstChild)
        }else{
            chat_content_container.append(message_container)
        }
        message_container.addEventListener('click',function(){
            message_container.classList.add('shown_time')
            if(message_container.nextSibling != null && message_container.nextSibling.childNodes[5] != null){
                if(message_container.nextSibling.childNodes[5].classList.contains('repliedTo')){
                    if(message_container.nextSibling.childNodes[5].childNodes[0].innerHTML.startsWith('<img')){
                        message_container.style.marginBottom = '88px'
                    }else{
                        message_container.style.marginBottom = '45px'
                    }
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
                    if(message_container.previousSibling.childNodes[1].firstChild.firstChild.dataset.user == data.user.uid){
                        message_container.childNodes[4].style.right = '-60px'
                    }else{
                        message_container.childNodes[4].style.right = '-60px'
                    }
                }else{
                    message_container.childNodes[4].style.right = '-60px'
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
            if(message_container.previousSibling.childNodes[1].firstChild.firstChild.dataset.user == data.user.uid){
                message_container.style.paddingLeft = '20px'
                message_container.childNodes[3].style.top = '7px'
                message_container.childNodes[3].style.borderBottomLeftRadius = '50%'
                message_container.childNodes[4].style.top = '7px'
                message_container.childNodes[4].style.borderTopLeftRadius = '50%'
                if(data.user.uid == auth.currentUser.uid){
                    message_container.style.borderTopLeftRadius = '15px'
                    message_container.style.borderBottomLeftRadius = '40px'
                }else{
                    message_container.style.borderTopRightRadius = '15px'
                    message_container.style.borderBottomRightRadius = '40px'
                }
                user_image_holder.style.display = 'none'
                message_user_container.style.display = 'none'
                if(message_container.previousSibling.childNodes[1].firstChild.style.display == 'none'){
                    if(data.user.uid == auth.currentUser.uid){
                        message_container.previousSibling.style.borderBottomLeftRadius = '15px'
                    }else{
                        message_container.previousSibling.style.borderBottomRightRadius = '15px'
                    }
                }
            }
        }else if(message_container.nextElementSibling != null){
            if(message_container.nextElementSibling.childNodes[1].firstChild.firstChild.dataset.user == data.user.uid){
                message_container.nextElementSibling.style.paddingLeft = '20px'
                message_container.nextElementSibling.childNodes[3].style.top = '7px'
                message_container.nextElementSibling.childNodes[3].style.borderBottomLeftRadius = '50%'
                message_container.nextElementSibling.childNodes[4].style.top = '7px'
                message_container.nextElementSibling.childNodes[4].style.borderTopLeftRadius = '50%'
                if(data.user.uid == auth.currentUser.uid){
                    message_container.nextElementSibling.style.borderTopLeftRadius = '15px'
                    message_container.nextElementSibling.style.borderBottomLeftRadius = '40px'
                }else{
                    message_container.nextElementSibling.style.borderTopRightRadius = '15px'
                    message_container.nextElementSibling.style.borderBottomRightRadius = '40px'
                }
                message_container.nextElementSibling.childNodes[0].style.display = 'none'
                message_container.nextElementSibling.childNodes[1].firstChild.style.display = 'none'
                if(message_container.nextElementSibling.childNodes[1].firstChild.style.display == 'none'){
                    if(data.user.uid == auth.currentUser.uid){
                        message_container.style.borderBottomLeftRadius = '15px'
                    }else{
                        message_container.style.borderBottomRightRadius = '15px'
                    }
                }
            }
        }else if(message_container.previousSibling == null){
            user_image.style.display = 'block'
                message_user_container.style.display = 'block'
        }
        message_deletebtn.addEventListener('click',function(){
            var confirm_delete_message_container = document.createElement('div')
            confirm_delete_message_container.setAttribute('class','popup_container')
            window.onkeyup = (e)=>{if(e.key == 'Escape'){closeDeleteMessage()}}
            var confirm_delete_message = document.createElement('div')
            confirm_delete_message.setAttribute('class','popup_window')
            var delete_message_text = document.createElement('p')
            delete_message_text.setAttribute('class','popup_text')
            delete_message_text.innerText = 'Delete Message ?'
            var buttons_container = document.createElement('div')
            buttons_container.setAttribute('class','popup_buttons')
            var button_delete = document.createElement('button')
            button_delete.setAttribute('class','popup_button_confirm')
            button_delete.innerText = 'Delete'
            button_delete.onclick = function(){
                if(data.user.uid == auth.currentUser.uid){
                    update(ref(db,`Rooms/${chatName}/messages/message_${data.index}`),{
                        deleted: true
                    })
                    closeDeleteMessage()
                }else{
                    createMainAlert(`<i class="fa-solid fa-ban icon"></i>`,'Access Denied',`You can\'t delete this`,'red')
                }
            }
            var button_keep = document.createElement('button')
            button_keep.setAttribute('class','popup_button_cancel')
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
                confirm_delete_message_container.style.opacity = '0'
                setTimeout(()=>{confirm_delete_message_container.remove()},300)
            }
            setTimeout(() => {
                confirm_delete_message_container.style.opacity = '1'
            },0);
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
    function createMainAlert(icon,title,message,color){
        if(document.querySelector('.toast') != null){
            document.querySelector('.toast').classList.remove('active')
            setTimeout(() => {
                document.querySelector('.toast').remove()
                createAlert()
            }, 500);
        }else{
            createAlert()
        }
        function createAlert(){
            var alert = document.createElement('div')
            alert.setAttribute('class','toast')
            alert.innerHTML = `
                <div class="toast-content">
                ${icon}
                    <div class="message-toast">
                        <span class="text text-1">${title}</span>
                        <span class="text text-2">${message}</span>
                    </div>
                </div>
                <i class="fa-solid fa-xmark close"></i>
                <div class="progress"></div>
            `
            setTimeout(() => {
                document.querySelector('.toast-content .icon').style.backgroundColor = `${color}`
                document.querySelector('.close').onclick = ()=>{
                    alert.classList.remove('active')
                    setTimeout(() => {
                        alert.remove()
                    }, 500);
                    clearTimeout(timer)
                }
                alert.classList.add('active')
                alert.style.borderColor = `${color}`
                document.querySelector('.progress').classList.add('active')
                document.querySelector('.progress').style.backgroundColor = `${color}`
                var timer = setTimeout(() => {
                    alert.classList.remove('active')
                    setTimeout(() => {
                        alert.remove()
                    }, 500);
                }, 5000);
            }, 1);
            document.body.append(alert)
        }
    }
    function deleteReplyMessage(){
        if(chat_input_container.childNodes[0].className == 'cloned_message'){
            chat_input_container.childNodes[0].style.opacity = '0'
                chat_input_container.childNodes[0].remove()
        }
    }
var app = new GLOBAL_CHAT()
onAuthStateChanged(auth,(user)=>{
    if(user == null){
        app.home()
    }else if(user.emailVerified){
        if(localStorage.room == undefined){
            localStorage.setItem('room',"Global")
        }
        document.body.innerHTML = '';
        app.chat(localStorage.room);
    }
})
}
