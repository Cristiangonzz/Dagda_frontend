import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaDomainEntity } from 'src/app/domain/entities/categoria.entity.domain';
import { CategoriaService } from 'src/app/domain/services/categoria.service.domain';
import { categoriaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-categoria/delegate-categoria.infrastructure';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css'],
})
export class TablaCategoriaComponent implements OnInit {
  delegateCategoria = categoriaUseCaseProviders;
  categorias!: CategoriaDomainEntity[];
  mostrarComponente: boolean = false;
  @Input() crearCategoria!: boolean;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
  ) {}
  
  finalizarCreacion(){
    this.mostrarComponente = false;
  }
  ngOnInit(): void {
    this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService)
      .execute();
    this.delegateCategoria.getAllCategoriaUseCaseProvider
      .useFactory(this.categoriaService)
      .statusEmmit.subscribe({
        next: (value: CategoriaDomainEntity[]) => {
          //this.categorias = value.map((x) => x.nombre);
          this.categorias = value;

        },
      });
  }
}