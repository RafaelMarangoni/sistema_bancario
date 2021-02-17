import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { HeaderDashService } from 'src/app/shared/components/headerdash/headerdash.service';
import { IAccount, IAccountResponse, ILancamento } from 'src/app/shared/interfaces/dashboard.interface';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  reloadSubscription: Subscription | undefined;

  constructor(
    private service: DashboardService,
    private headerDashService: HeaderDashService
    ) { }

  loading: boolean = false;

  public accounts: IAccount = {
    CORRENTE: {
        id: 0,
        type: 'Conta Corrente',
        icon: '../../../../assets/img/svg/dollar.svg',
        colorValue: 'green',
        saldo: 0,
        lancamentos: <ILancamento[]>[]
    },

    POUPANCA: {
        id: 0,
        type: 'Conta Poupanca',
        icon: '../../../../assets/img/svg/dollar.svg',
        colorValue: 'blue',
        saldo: 0,
        lancamentos: <ILancamento[]>[]
    },

    CREDITO: {
        id: 0,
        type: 'Conta de Crédito',
        icon: '../../../../assets/img/svg/card.svg',
        colorValue: 'red',
        saldo: 0,
        lancamentos: <ILancamento[]>[]
    }
  }

  public message: string = 'Olá, Usuár, seja bem vind! :)'

  ngOnInit(): void {
      this.getAccountData();
      this.subscribeOnReload();
  }

  ngOnDestroy() {
    this.reloadSubscription?.unsubscribe();
  }

  getAccountData(){
    this.loading = true;
    this.service.getAccountData().pipe(
      take(1),
      finalize(() => this.loading = false)

    ).subscribe(response => this.fillData(response));
  }

  fillData(data: IAccountResponse[]){
    data.forEach(item => {
        let _type = item.tipo as keyof IAccount;

        this.accounts[_type].id = item.id;
        this.accounts[_type].saldo = item.saldo;
        this.accounts[_type].lancamentos = this.limitData(item.lancamentos);
    })
  }

  limitData(lancamentos: ILancamento[]): ILancamento[]{
    const limit = 3;
    return lancamentos.reverse().slice(0,limit);
  }

  seeAll(value: string){
    //redirecionar para extrato com esse value, buscando automaticamente o extrato correto para o tipo de conta
  }

  txtValor(valor:number ){
    return {
      'text-positivo':valor>0,
      'text-negativo':valor<0,
      'text-neutro':valor==0,
    }
  }

  subscribeOnReload() {
    this.reloadSubscription = this.headerDashService.$reloadData
      .subscribe(
        () => this.getAccountData(),
      );
  }
}
