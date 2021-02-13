import { dashboardHeader as Header } from '../index';

const PlanCount = {
  
    render:  () => {
        let view = `
        <div class="content-default content-flex content-justify">
            <div class="section">
            ${ Header.render('Olá, <strong>Pessoa lendo</strong>, seja bem-vin!') }
            </div>
         </div>
         ${newAcountPlan}           
        `;

        return view
    },

    after_render:  () => {

    }


}

let newAcountPlan = 
`
<div class="content content-default content-flex content-justify">
    <div class="card ">
        <h2>Cadastre novo plano</h2>
        <form id="login_form" class="card-form">
            <input type="text" placeholder="Digite novo plano">            
            <button id="button_submit" type="submit" class="btn btn-main-outline btn-rounded">Cadastrar</button>
        </form>   
        <div class="card-dashboard--default m-1">
        <div class="content-intern--default content-align--center">
            <span class="text-card--default">Planos cadastrados</span>                
        </div>
        <div>
            <ul class="text-card--default text-center" style="list-style:none; padding-left: 0">
                <li>Academia</li>
                <li>Imposto</li>
            </ul>
        </div>        
    </div>     
    </div>
   
</div>
`


export default PlanCount;