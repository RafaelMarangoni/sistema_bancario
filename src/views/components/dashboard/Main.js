import DashboardService from '../../../service/DashboardService';

import { dashboardHeader as Header, extract as Extract } from '../index';
import { dashboard as Dashboard } from './../../pages/index';

import dollarIcon from '../../../assets/img/svg/dollar.svg'
import cardIcon from '../../../assets/img/svg/card.svg'
import cardOpenedIcon from '../../../assets/img/svg/opencard.svg'



const Main = {
    render: () => {
        const CONTA_CREDITO = JSON.parse(localStorage.getItem('CONTA_CREDITO'));
        const CONTA_POUPANCA = JSON.parse(localStorage.getItem('CONTA_POUPANCA'));
        const CONTA_CORRENTE = JSON.parse(localStorage.getItem('CONTA_CORRENTE'));
        const NOME_USUARIO = 'nome usuario';

        translateObj['CREDITO'] = { ...CONTA_CREDITO, ...translateObj['CREDITO']};
        translateObj['POUPANCA'] = { ...CONTA_POUPANCA, ...translateObj['POUPANCA']};
        translateObj['CORRENTE'] = { ...CONTA_CORRENTE, ...translateObj['CORRENTE']};

        let view = `
        <div class="container">
            <div class="dash-header">
                <div class="section">
                    ${ Header.render(`Olá, <strong id="user-name">${NOME_USUARIO}</strong>, seja bem-vind!`, 'main') }
                </div>
            </div>
            <div class="accounts">
                ${accountCard(translateObj['CORRENTE'])}
                ${accountCard(translateObj['POUPANCA'])}
                ${accountCard(translateObj['CREDITO'])}
            </div>
        </div>
        `;

        return view
    },

    after_render: () => {
        Header.after_render();
        const see_more = document.querySelectorAll('a.see_more');
        see_more.forEach(item => {
            item.addEventListener('click', async () => {              
                const sigla = item.getAttribute('value');
                const lancamentos = await DashboardService.getStatementByAccount({ sigla: sigla });

                Dashboard.insertDashboardContent('bankstatement');
                Extract.updateTransactionsList(lancamentos, sigla);
            })
        })
    },
}

export default Main;

const accountCard = ({ type, saldo, lancamentos, icon, colorValue, tipo }) => `
    <div class="card-dashboard">
        <div class="content-align--center">
            <img src="${ icon }"  class="content-icon--default" alt="">
            <span class="text-card--default">${ type }</span>
        </div>
        <div class="content-justify--between">
            <div class="content-intern--default">
                <span class="text-card--default">Saldo atual</span>
                <h2 class="text-money text-${ colorValue }">R$: ${ saldo }</h2>
            </div>
        </div>
        <div id="latest_transactions">
            <div class="content-intern--default content-flex content-justify--between">
                <span class="text-card--default">Últimos lançamentos</span>
                <a class="see_more text-card--ancor ml-1" value="${tipo}">Ver extrato completo</a>
            </div>
            ${ buildTransactions(lancamentos) }
        </div>
    </div>
`

const buildTransactions = (lancamentos) => {
    if(!lancamentos.length){
        return `
        <div class="content-intern--default content-flex content-justify" id="transaction">
            <span class="text-grey text-size--12">Sem lançamentos para essa conta</span>
        </div>

        `
    }

    let html = [];

    lancamentos = lancamentos.sort(function (a, b) {
        console.log(a.date)
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
    });

    lancamentos.length = 3;

    lancamentos.forEach(({ date, descricao, valor }) => {
        let newLancamento =
            `    
            <div class="content-intern--default content-flex" id="transaction">
                <img src="${ cardOpenedIcon }" class="content-icon--default" alt="">
                <div class="content-transaction content-flex--1 content-flex--column">
                    <div class="payment-description content-flex content-flex--1 content-justify--between content-align--center">
                        <span class="text-black"><strong>Compra no débito</strong></span>
                        <span class="text-grey text-size--12">${ date }</span>
                    </div>
                    <span class="text-card--default content-padding--default">${ descricao }</span>
                    <span class="text-red text-size--20">R$ ${ valor }</span>
                </div>
            </div>
        `
        html.push(newLancamento);
    });

    return html.join('');
}


let translateObj = {
    CORRENTE: {
        type: 'Conta Corrente',
        icon: dollarIcon,
        colorValue: 'green'
    },

    POUPANCA: { 
        type: 'Conta Poupanca',
        icon: dollarIcon,
        colorValue: 'blue'
    },

    CREDITO: { 
        type: 'Conta de Crédito',
        icon: cardIcon,
        colorValue: 'red'
    }
}
