import { ModalDialogComponent } from 'src/app/commum/modals/modal-dialog/modal-dialog.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoService } from './../../../commum/service/produto.service';
import { Produto } from './../../../commum/model/produtos.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriasService } from 'src/app/commum/service/categorias.service';
import { Categorias } from 'src/app/commum/model/categorias.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutosComponent implements OnInit {
  private httpReq: Subscription
  public produtoForm: FormGroup
  
  produto: Produto[] = null
  categorias: Categorias[] = null
  statusResponse: number
  messageApi: string
  modalRef: BsModalRef

  constructor(
    private service: ProdutoService,
    private serviceC: CategoriasService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modal: BsModalService
) { }

  ngOnInit(): void {
    this.getAllProdutos()  
  }

  getAllProdutos(){
    this.httpReq = this.service.getAllProdutos().subscribe(response =>{
      this.messageApi = response.body['message']
      this.produto = response.body['data']
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
          this.getAllProdutos()
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
