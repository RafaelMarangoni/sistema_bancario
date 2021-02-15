import { api } from './api';
import { HeadersDefaultNoAuth , HeadersDefault} from './HeadersDefault';

import Utils from '../service/Utils';
import Swal from 'sweetalert2';

const UserService = {
    register: async ({ cpf, login, nome, senha }) => {
        let data = { cpf, login, nome, senha }

        await api.post('/usuarios', data, HeadersDefaultNoAuth).then(r =>{
            Swal.fire({
                icon: 'success',
                title: 'Yes!...',
                text: 'Concluído',
                footer: r.data
            }).then(()=>{
                location.reload();
            })
            Utils.redirect_to('login');

        }).catch(error => Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Verifique os dados e tente novamente',
                                footer: error
                            }).then(()=>{
                                location.reload();
                            }))
    },

    doLogin: async({ usuario, senha }) => {
        const data = { usuario, senha };

        await api.post('/login', data, HeadersDefaultNoAuth).then(response =>{
            UserService.setDataIntoLocalStorage(response.data);
            Utils.redirect_to('dashboard');
           
        })
        .catch(({ response }) => {
            let { data, status } = response;
            if(data === 'Usuário ou senha Inválida' && status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data,
                    footer: 'Verifique os dados e tente novamente'
                  }).then(()=>{
                      location.reload();
                  });
            }
        });
    },

    newPassword: async ({ login }) => {
       let data = { email: "not-implemented@desbugados.com", login: login }
        await api.post('/nova-senha', data, HeadersDefaultNoAuth).then(response => {
            Utils.redirect_to('login');

        }).catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifique os dados e tente novamente',
            footer: error
        }).then(()=>{
            location.reload();
        }))

    },

    updatePassword: async ({ senha }) => {         
        const token = JSON.parse(localStorage.getItem('token'));
        const login = JSON.parse(localStorage.getItem('login'));

        let data = { senha: senha, usuario: login }

        await api.post('/altera-senha', data, HeadersDefault(token)).then(response => {
           Utils.redirect_to('dashboard');

        }).catch(error => Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Verifique os dados e tente novamente',
            footer: error
        }).then(()=>{
            location.reload();
        }))
        
    },


    doLogout: () => {
        localStorage.clear();

        Utils.redirect_to('/');
    },

    isUserLogged: () => {
        let response = true;
        
        const token = JSON.parse(localStorage.getItem('token'));

        if (!token){
            Utils.redirect_to('login');
            response = false;
        }

        return response;
    },

    isTokenExpired: () => {
        let response = false;

        const dataFim = JSON.parse(localStorage.getItem('dataFim'));

        const tokenDate = new Date(dataFim);
        const now = new Date();

        if(now > tokenDate){
            response = true;

            Utils.redirect_to('login');
        }
        
        return response;
    },

    setDataIntoLocalStorage: (data) => {
        let { token, login, dataInicio, dataFim } = data;

        localStorage.setItem('dataInicio', JSON.stringify(dataInicio));
        localStorage.setItem('dataFim', JSON.stringify(dataFim));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('login', JSON.stringify(login));
    },   

}

export default UserService;