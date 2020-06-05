import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, ROUTES } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './commum/login/login.component';
import { FooterVendaComponent } from './Site-Vendas/footer-venda/footer-venda.component';
import { HeaderVendaComponent } from './Site-Vendas/header-venda/header-venda.component';
import { HomeVendaComponent } from './Site-Vendas/home-venda/home-venda.component';
import { SidebarAdministrativoComponent } from './Painel-Administrativo/sidebar-administrativo/sidebar-administrativo.component';
import { HeaderAdministrativoComponent } from './Painel-Administrativo/header-administrativo/header-administrativo.component';
import { FooterAdministrativoComponent } from './Painel-Administrativo/footer-administrativo/footer-administrativo.component';
import { HomeAdministrativoComponent } from './Painel-Administrativo/home-administrativo/home-administrativo.component';
import { ControlSidebarAdministrativoComponent } from './Painel-Administrativo/control-sidebar-administrativo/control-sidebar-administrativo.component';
import { CategoriaAdministrativoComponent } from './Painel-Administrativo/categoria-administrativo/categoria-administrativo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarLoginComponent } from './commum/login-registrar/registrar-login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListarUsuariosComponent } from './Painel-Administrativo/usuarios/listar-usuarios/listar-usuarios.component';
 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterVendaComponent,
    HeaderVendaComponent,
    HomeVendaComponent,
    SidebarAdministrativoComponent,
    HeaderAdministrativoComponent,
    FooterAdministrativoComponent,
    HomeAdministrativoComponent,
    ControlSidebarAdministrativoComponent,
    CategoriaAdministrativoComponent,
    RegistrarLoginComponent,
    ListarUsuariosComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
