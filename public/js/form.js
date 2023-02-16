// form load animation

const form = [...document.querySelector('.form').children]

form.forEach( (item, i) => {
    setTimeout( () => {
        item.style.opacity = 1
    }, i*100)
})


const name = document.querySelector('.name')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const submitBtn = document.querySelector('.submit-btn')

if(name == null){
    //login page
    submitBtn.addEventListener('click', ()=>{
        fetch('/login-user', 
        {
            method: 'post',
            headers: new Headers({'content-type':'application/json'}),
            body: JSON.stringify({email: email.value, password: password.value})
        })
        .then(
            res => res.json()
        )
        .then(
            data => {
                if(data.name){
                    alert('login successful')
                } else{
                    alert(data)
                }
            }
        )
    })
} else{
    // register page

    submitBtn.addEventListener('click', () => {
        fetch('/register-user',{
            method: 'post',
            headers: new Headers({'content-type':'application/json'}),
            body: JSON.stringify({
                name : name.value,
                email: email.value,
                password: password.value,
            })
        }).then( res => res.json())
        .then( data => {
            if(data.name){
                alert('register successful')
            } else{
                alert(data)
            }
        })
    })
}