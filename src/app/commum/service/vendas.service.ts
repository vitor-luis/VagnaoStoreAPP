import { Vendas } from './../model/vendas.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagnaoAPI } from 'src/app.api';

@Injectable({
  providedIn: 'root'
})
export class VendasService {
  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllVendas(): Observable<HttpResponse<Vendas[]>> {
    return this.http.get<Vendas[]>(`${VagnaoAPI}/venda/`, { observe: 'response' })
  }

  postVenda(form): Observable<HttpResponse<any>>{
    return this.http.post<Vendas>(`${VagnaoAPI}/venda/`, form, { observe: 'response' })
  }
  
}
