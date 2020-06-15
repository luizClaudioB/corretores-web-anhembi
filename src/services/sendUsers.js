import Axios from 'axios';

const sendUsers = {
    EnviarUsers(name, email, password) {
        return Axios.post(`https://cors-anywhere.herokuapp.com/` + 'https://admin-soseguros.000webhostapp.com/controllers/controllerUser.php',
         { name: name, email: email, password: password});
    }
}

export default sendUsers;