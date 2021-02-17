import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { HeaderDashService } from 'src/app/shared/components/headerdash/headerdash.service';
import { IResponseStatement } from './extrato.interface';
import { ExtratoService } from './extrato.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html'
})
export class ExtratoComponent implements OnInit, OnDestroy {

  reloadSubscription: Subscription | undefined;

  constructor(
    private service: ExtratoService,
    private headerDashService: HeaderDashService
    ) { }

  message: string = ''
  loading: boolean = false;
  accountData: IResponseStatement = { lancamentos: [], saldo: -1 };

  //form
  sigla: string = 'POUPANCA';
  dataInicio: string = '';
  dataFim: string = '';

  ngOnInit(): void {
    const data = new Date(Date.now()).toISOString().slice(0,10)
    this.dataInicio = data.slice(0,8)+'01'
    this.dataFim = data
    this.getStatementByPeriod(this.sigla,this.dataInicio, this.dataFim);
    this.subscribeOnReload();
  }

  ngOnDestroy() {
    this.reloadSubscription?.unsubscribe();
  }

  filter(){
    this.getStatementByPeriod(this.sigla,this.dataInicio, this.dataFim)
  }

  getStatementByAccount(sigla: string){
    this.loading = true;
    this.service.getStatementByAccount(sigla).
    pipe(
      take(1),
      finalize(() => this.loading = false)
    )
    .subscribe(
      response => this.accountData = response,
      error => console.error(error)
    )
  }

  getStatementByPeriod(sigla: string, dataInicio: string, dataFim: string){
    this.loading = true;
      if(!dataInicio)
        dataInicio = this.dataInicio
      if(!dataFim)
        dataFim = this.dataFim

    this.service.getStatementByPeriod({ dataFim, dataInicio, sigla }).
    pipe(
      take(1),
      finalize(() => this.loading = false)
    )
    .subscribe(
      response => this.accountData = response,
      error => console.error(error)
    )
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
        () => this.ngOnInit(),
      );
  }
}
