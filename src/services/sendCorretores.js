import Axios from 'axios';

const sendCorretores = {
    EnviarCorretores(nome, tipo, estado, empresa, numero, email) {
        return Axios.post(`https://cors-anywhere.herokuapp.com/` + 'https://admin-soseguros.000webhostapp.com/controllers/controllerCorretor.php',
         { nome: nome, tipo_seg: tipo, estado: estado, empresa: empresa, numero: numero, email: email});
    }
}

export default sendCorretores;