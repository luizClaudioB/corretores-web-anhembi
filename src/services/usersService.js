import Axios from 'axios';

const getUsers = {
    SearchUsers() {
        return Axios.get(`https://cors-anywhere.herokuapp.com/` + `https://admin-soseguros.000webhostapp.com/controllers/controllerUser.php`);
      }
}

export default getUsers;