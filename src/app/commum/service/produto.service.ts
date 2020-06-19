import { Produto } from '../model/produtos.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VagnaoAPI } from 'src/app.api';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
 
  constructor(private http: HttpClient) { }

  params = new HttpParams()

  getAllProdutos(): Observable<HttpResponse<Produto[]>> {
    console.log(VagnaoAPI);
    return this.http.get<Produto[]>(`${VagnaoAPI}/produtos/`, { observe: 'response' })
  }
  
  
  getProduto(id:number): Observable<HttpResponse<Produto>>{
    return this.http.get<Produto>(`${VagnaoAPI}/produtos/${id}`, { observe: 'response' })
  
  }

  postProdutos(form: Produto): Observable<HttpResponse<any>> {
    return this.http.post<Produto>(`${VagnaoAPI}/produtos/`, form, { observe: 'response' })
  }
  
  updateProdutos(id:number, form: Produto): Observable<HttpResponse<any>>{
    return this.http.put<Produto>(`${VagnaoAPI}/produtos/${id}`,form, { observe: 'response' })
  }

  deleteProdutos(produto: Produto) {
    return this.http.delete<Produto>(`${VagnaoAPI}/produtos/${produto.id}`, { observe: 'response' })
  }


  
  
}












