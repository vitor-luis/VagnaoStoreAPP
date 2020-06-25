import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';
import { Produto } from './../../../commum/model/produtos.model';
import { ProdutoService } from './../../../commum/service/produto.service';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Categorias } from 'src/app/commum/model/categorias.model';

@Component({
  selector: 'app-visualizar-produtos',
  templateUrl: './visualizar-produtos.component.html',
  styleUrls: ['./visualizar-produtos.component.css']
})
export class VisualizarProdutosComponent implements OnInit {

private httpReq: Subscription

categorias: Categorias = null
produto: Produto
messageApi: string
statusResponse: number
modalRef: BsModalRef

constructor(
  private service: ProdutoService,
  private serviceC: CategoriasService,
  private _activatedRoute: ActivatedRoute,
  private router: Router,
  private toastr: ToastrService,
  private modal: BsModalService
) { 
  
}

ngOnInit(): void {
  const id = this._activatedRoute.snapshot.params['id']

  this.getProduto(id)
}

getProduto(id: number){
  this.httpReq = this.service.getProduto(id).subscribe(res => {
    this.statusResponse = res.body['message']
    this.produto = res.body.data[0]
    this.getCategoria(this.produto.idCategoria)
    

  }, err =>{
    this.messageApi = err.error['message']
  })
}

getCategoria(id: number){
   id = this.produto.idCategoria
      this.httpReq = this.serviceC.getCategoria(id).subscribe(response =>{
      this.messageApi = response.body['message']
      this.categorias = response.body['data'][0];
      
    }, err=>{
      this.statusResponse =err.status
      this.messageApi= err.error['message']
  })
  

}
canDelete(nome: string, id:number) {
  const initialState = { message: `Deseja excluir o produto ${nome} ?` }
  this.modalRef = this.modal.show(ModalDialogComponent, { initialState })
  
  
  this.modalRef.content.action.subscribe((answer) => {
    
    if(answer ==true){
    this.service.deleteProdutos(id).subscribe(response => {
      
              this.modalRef.hide()
        this.showToastrSuccess()
        this.router.navigate(['/administrativo/produtos'])

      }, err => { 
        
        this.modalRef.hide()
        this.showToastrError()
        this.router.navigate(['/administrativo/produtos'])
      })
    }else{
      this.modalRef.hide()
    }
    })
}

showToastrSuccess() {
  this.toastr.success('Usuário foi excluido com sucesso', null, {
    progressBar: true,
    positionClass: 'toast-bottom-center'
  })
}

showToastrError() {
  this.toastr.error('Houve um erro ao excluir o usuário. Tente novamente.', null, {
    progressBar: true,
    positionClass: 'toast-bottom-center'
  })
}



}