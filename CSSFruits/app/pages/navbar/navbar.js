// TODO the login page can't get elements from the navbar without setTimeout, find a fix
setTimeout(() => {
    let logState = localStorage.getItem('isLoggedIn') ?? null
    if (logState){
       logState = JSON.parse(logState);
    } else {
        logState = false;
    }

    let isLoggedIn = logState.state;
    console.log(isLoggedIn);
    const loginButton = document.querySelector('#userButton')

    document.querySelector('#cartIcon').hidden = true
    document.querySelector('#cartAmount').hidden = true


    loginButton.textContent = isLoggedIn ? 'Déconnexion' : 'Connexion';

    loginButton.addEventListener('click', () => {
        if (isLoggedIn) {
            localStorage.setItem('isLoggedIn', JSON.stringify({'state': false}));
            window.location.reload();
        } else {
            window.location.href = '../login/login.html'
        }
    })
}, 10)