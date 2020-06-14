import Axios from 'axios';

const getCorretores = {
    SearchCorretores() {
        return Axios.get(`https://cors-anywhere.herokuapp.com/` + `https://admin-soseguros.000webhostapp.com/controllers/controllerCorretor.php`);
      }
}

export default getCorretores;