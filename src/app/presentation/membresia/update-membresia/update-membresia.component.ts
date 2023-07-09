import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MembresiaDomainEntity } from 'src/app/domain/entities/membresia.entity.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';
import { UpdateMembresiaDto } from 'src/app/infrastructure/dto/create/update-membresia.dto';
import { SweetAlert } from '../../shared/sweetAlert/sweet-alert.presentation';
@Component({
  selector: 'app-update-membresia',
  templateUrl: './update-membresia.component.html',
  styleUrls: ['./update-membresia.component.css'],
})
export class UpdateMembresiaComponent implements OnInit ,AfterViewInit {
  delegateMembresia = membresiaUseCaseProviders;
  membresiaUpdate: UpdateMembresiaDto = {} as UpdateMembresiaDto;
  membresia: MembresiaDomainEntity = {} as MembresiaDomainEntity;
  public sweetAlert = new SweetAlert();

  FormUpdate = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    beneficios: new FormControl('', [Validators.required, Validators.minLength(2)]),
    costo: new FormControl<number>(0, [Validators.required]),

    });

  constructor(
    private membresiaService: MembresiaService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  
  ) {
     
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit(): void {

    this.buscarMembresia();
  }

  
  buscarMembresia() {
    this.delegateMembresia.getMembresiaByNameUseCaseProvider.useFactory(
      this.membresiaService
    )
      .execute(this.activatedRoute.snapshot.params['nombre'])
      .subscribe({
        next: (data: MembresiaDomainEntity) => {
          this.membresia = data;
          
          this.FormUpdate.patchValue({
            nombre: data.nombre,
            beneficios: data.beneficios,
            costo: data.costo,
          });
         
        },
        error: (error) => {
          this.sweetAlert.toFire(
            'Error',
            'No se pudo encontrar Membresia ',
            'error'
          );
        },
      });
  }


  send() {
    if (
      this.membresia.nombre !=
      (this.FormUpdate.get('nombre')?.value as string)
    )
      this.membresiaUpdate.nombre = this.FormUpdate.get('nombre')
        ?.value as string;

    if (this.membresia.costo != (this.FormUpdate.get('costo')?.value as number))
      this.membresiaUpdate.costo = this.FormUpdate.get('costo')?.value as number;

    if (
      this.membresia.beneficios != (this.FormUpdate.get('beneficios')?.value as string)
    )
      this.membresiaUpdate.beneficios = this.FormUpdate.get('beneficios')
        ?.value as string;

        console.log("datos para update",this.membresiaUpdate);
    this.delegateMembresia.updateMembresiaUseCaseProvider.useFactory(this.membresiaService)
      .execute(this.membresia.nombre, this.membresiaUpdate)
      .subscribe({
        next: () => {
          this.sweetAlert.toFire('Completo', 'Membresia Actualizada', 'success');
          this.router.navigate(['/usuario/adminMembresia']);
        },
        error: (err) => {
          this.sweetAlert.toFire('Error', 'No se puedo actualizar Membresia', 'error');
          
          this.router.navigate(['/usuario/adminMembresia']);
        },
      });
  }
  cancelar() {
    this.router.navigate(['/usuario/adminMembresia']);
  }

 
  
 
}
