const greeting = document.querySelector('.greeting')

window.onload = ()=>{
    if(!sessionStorage.name){
        location.href = '/'
    }else{
        greeting.innerHTML = `Hola ${sessionStorage.name}`
    }
}

const logout = document.querySelector('.logout')
logout.addEventListener('click', ()=>{
    sessionStorage.clear()
    location.reload()
})