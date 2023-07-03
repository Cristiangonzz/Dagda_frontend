import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrearMembresiaDto } from 'src/app/infrastructure/dto/create/create-membresia.dto';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-membresia',
  templateUrl: './create-membresia.component.html',
  styleUrls: ['./create-membresia.component.css'],
})
export class CreateMembresiaComponent implements OnInit ,AfterViewInit{
  delegateCurso = membresiaUseCaseProviders;
  membresia : CrearMembresiaDto = {} as CrearMembresiaDto;

  sweet = new SweetAlert();

  FormRegister = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    beneficios: new FormControl('', [Validators.required, Validators.minLength(2)]),
    costo: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private cursoService: MembresiaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
   window.scrollTo(0, 0);
  }

  send(){

    this.membresia.nombre = this.FormRegister.get('nombre')?.value as string;
    this.membresia.beneficios = this.FormRegister.get('beneficios')?.value as string;
    this.membresia.costo = this.FormRegister.get('costo')?.value as number;

    this.delegateCurso.createMembresiaUseCaseProvider
    .useFactory(this.cursoService)
    .execute(this.membresia).subscribe({
      next: () => {
        this.sweet.toFire('Completo', 'Membresia Creada', 'success');
        this.router.navigate(['usuario/membresia']);
      },
      error: (err) => {
        this.sweet.toFire('Error', err, 'error');
      }
    });
  }


  cancelar(){ 
    this.router.navigate(['/membresia']);
  }

}