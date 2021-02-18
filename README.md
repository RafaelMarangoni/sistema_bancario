# BankDesbugados 🚀🚀


## Descrição 

Projeto proposto no bootcamp da GAMA ACCENTURE, onde tinhamos que cirar uma aplicação JS, criar nossa propria aplicação com webpack sem o auxilio de um frame work , e após isso tranferir o projeto para angular. 

### Tecnologias usadas 

* Angular 
* RxJs
* JavaScript 

-> repositório :  https://github.com/RafaelMarangoni/sistema_bancario/tree/front%233 <br>
-> netfly :  https://desbugados.netlify.app/<br>
Após a finalização migramos toda a aplicação para angular .<Br> 
-> repositório : https://github.com/RafaelMarangoni/sistema_bancario/tree/angular<br>
-> netfly https://app-desbugados.netlify.app/<br>

## Design 👨‍🎨👩‍🎨

Proposto como base para poder termos uma base de criação. 
Paleta de cores -

Predominante roxa  
Secundarias verde


## Sobre a estrutura do projeto 🛠

A aplicação  está separada em componentes, todo o projeto está modularizado, conforme o carregamento, onde os modulos são carregados conforme a necessidade de serem utilizados dentro da mesma chamada. 

### Estrutura de pastas 

#### components 

📦src<br>
 ┣ 📂app<br>
 ┃ ┣ 📂auth <br>
 ┃ ┃ **Dentro de Auth se encontra a base do dashboard.**<br>
 ┃ ┃ ┣ 📂account-plan<br>
 ┃ ┃ ┣ 📂dashboard<br>
 ┃ ┃ ┣ 📂extrato<br>
 ┃ ┃ ┣ 📂transaction<br>
 ┃ ┣ 📂changepass<br>
 ┃ ┣ 📂error404<br>
 ┃ ┣ 📂forgotpass<br>
 ┃ ┣ 📂home<br>
 ┃ ┃ ┣ 📂bloco-anuidade<br>
 ┃ ┃ ┣ 📂bloco-cadastro-login<br>
 ┃ ┃ ┃ ┣ 📂bloco-login<br>
 ┃ ┃ ┃ ┣ 📂form-cadastro<br>
 ┃ ┣ 📂login<br>
 ┃ ┣ 📂shared<br>
        **Componentes re-utilizados (onde se encontram em diversas partes da aplicação), estão juntos dentro da pasta shared, dentro de shared também se encontra as interfaces dos mesmos.**<br>
 ┃ ┃ ┣ 📂components<br>
 ┃ ┃ ┃ ┣ 📂headerdash<br>
 ┃ ┃ ┃ ┣ 📂nav<br>
 ┃ ┃ ┃ ┗ 📂navdashboard<br>
 ┃ ┃ ┣ 📂interfaces<br>
 ┃ ┃ ┗ 📂services<br>
 ┃ ┃ ┃ ┣ 📂account-plan<br>
 ┃ ┃ ┃ ┗ 📂auth<br>

#### estilização 

**Dentro de assets sass se encontra toda estrutura de estilização de cada components e commons,separando as estilazaçõs especificas das generalizadas.**

 ┣ 📂assets<br>
 ┃ ┣ 📂sass<br>
 ┃ ┃ ┣ 📂commons<br>
 ┃ ┃ ┗ 📂components<br>
 ┣ 📂css<br>


* Todos imports do Sass se encontra dentro do Styles.scss 

## Utilização 

Necessario relizar ```sh npm i "enter" ``` (npm install), para instalar todas dependencias citadas dentro do .gitignore 

## Padrão de commit 

* Utilizamos o padrao Conventional Commits Pattern 
```sh type(scope): subject ```

## Scrum 

* Optamos pela divisão no modo Kaban, utilizando o proprio sistema de ISSUE do git, onde facilita a gestão do projeto. 

Para visualizar a separação dos projetos clique <a href="https://github.com/RafaelMarangoni/sistema_bancario/projects/4">Aqui</a>
</p>
