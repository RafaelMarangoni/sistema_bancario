import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';

import { ITransaction } from './transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  API_URL = environment.API_URL

  constructor(
    private http:HttpClient,
    private authService: AuthService
  ) { }

  public doTransaction(data: ITransaction, operacao: string){
    data.contaOrigem.login = this.authService.getLogin();

    if(operacao !== 'TRANSFERENCIA')
      data.contaDestino.login = this.authService.getLogin();

    const params = new HttpParams()
      .set('operacao', operacao)

    return this.http.post(`${this.API_URL}lancamentos/?${params}`, data, {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.authService.getToken()
        }
      ),
      responseType: 'text',
    })
  }
}
