const getFormData = () => {
    const form = document.connexion
    if (form.email.value.length <= 2){
        alert('Veuiller indiquer un email');
        return;
    }
    if (form.pseudonyme.value.length <= 2){
        alert('Veuiller indiquer un pseudo');
        return;
    }
    if (form.password.value.length <= 2){
        alert('Veuiller indiquer un mot de passe');
        return;
    }
    const email = form.email.value;
    const pseudo = form.pseudonyme.value ?? null;
    const password = form.password.value;
    return {
        'email': email,
        'pseudo': pseudo,
        'password': password
    }
}
const doesUserExist = (email) => localStorage.getItem(email) !== null;

const isPseudoUsed = (pseudo) => {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);

        try {
            let user = JSON.parse(item);
            if (user && user.pseudo === pseudo) {
                return true;
            }
        } catch (error) {
            console.error(`Error parsing item with key "${key}": ${error}`);
        }
    }
    return false;
}
const registerUser = () => {
    const formData = getFormData();
    if (!formData) return;

    if (doesUserExist(formData.email)) {
        alert('Utilissateur déjà existant');
        return
    }
    if (isPseudoUsed(formData.pseudo)) {
        alert('Pseudo non disponible');
        return;
    }

    const userData = {
        'pseudo': formData.pseudo,
        'password': formData.password
    }
    localStorage.setItem(formData.email, JSON.stringify(userData));
    logIn();
}

const logIn = () => {
    const formData = getFormData();
    if (!formData) return;
    if (!doesUserExist(formData.email)) {
        alert('Adresse E-mail invalide');
        return;
    }
    const user = JSON.parse(localStorage.getItem(formData.email))
    if (user.password !== formData.password){
        alert('Mot de pass invalide');
        return;
    }
    localStorage.setItem('isLoggedIn', JSON.stringify({'state': true, 'pseudo': formData.pseudo}));
    window.location.href = '../home/home.html'
}