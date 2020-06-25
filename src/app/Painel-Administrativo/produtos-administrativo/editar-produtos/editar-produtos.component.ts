import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from './../../../commum/service/produto.service';
import { Produto } from './../../../commum/model/produtos.model';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  private httpReq: Subscription
  public produtoForm: FormGroup
  
  produto: Produto = null
  statusResponse: number
  messageApi: string
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ProdutoService,
    private router: Router,
    private _toastr: ToastrService,
  ) {
    this.initForm()   
  }

  
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.getProduto(id)
}

initForm(){
  this.produtoForm = this.formBuilder.group({
    id:[''],
    nome: ['', [Validators.required]],
    descricao: ['', [Validators.required]],
    preco: ['', [Validators.required]],
    quantidadeEstoque: ['', [Validators.required]],      
    urlImagem: ['', [Validators.required]],
  })
}

  getProduto(id : number){
    this.httpReq = this.service.getProduto(id).subscribe(response =>{
    this.messageApi = response.body['message']
    this.produto = response.body.data[0]; 
    this.populateForm()
    }, err=>{
      this.statusResponse =err.status
      this.messageApi= err.error['message']
    })
  }

  populateForm(){
    this.produtoForm.patchValue({
      id: this.produto.id,
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      preco: this.produto.preco,
      quantidadeEstoque: this.produto.quantidadeEstoque,
     urlImagem: this.produto.urlImagem,     
    })
  }
  
  onSubmit() {
    this.httpReq = this.service.updateProdutos(this.produtoForm.value,this.produtoForm.value.id).subscribe(res =>{
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrSuccess()
    }, err =>{
      this.produtoForm.reset()
      this.router.navigate(['/administrativo/produtos'])
      this.showToastrError()
    })
  }

  showToastrSuccess() {
    this._toastr.success('Edição realizado com sucesso', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  showToastrError() {
    this._toastr.error('Houve um erro na edição do produto. Tente novamente.', null, {
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }

  get nome() { return this.produtoForm.get('nome') }
  get descricao() { return this.produtoForm.get('descricao') }
  get preco() { return this.produtoForm.get('preco') }
  get quantidadeEstoque() { return this.produtoForm.get('quantidadeEstoque') }
  get urlImagem() { return this.produtoForm.get('urlImagem') }
  get idCategoria() { return this.produtoForm.get('idCategoria') }
    
  }

