import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMembresiaDomain } from 'src/app/domain/interfaces/membresia.inteface.domain';
import { MembresiaService } from 'src/app/domain/services/membresia.service.domain';
import { membresiaUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-membresia/delegate-membresia.infrastructure';

@Component({
  selector: 'app-get-membresia',
  templateUrl: './get-membresia.component.html',
  styleUrls: ['./get-membresia.component.css'],
})
export class GetMembresiaComponent {

  delegateMembresia = membresiaUseCaseProviders;

  membresia: IMembresiaDomain = {} as IMembresiaDomain;
  
  constructor(
    private membresiaService: MembresiaService,
    private readonly router: Router ,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getMembresia();
  }

  getMembresia(){
    const nombre = this.activatedRoute.snapshot.params['nombre'];
    this.delegateMembresia.getMembresiaByNameUseCaseProvider
      .useFactory(this.membresiaService).execute(nombre).subscribe({
        next: (value: IMembresiaDomain) => {
          this.membresia = value;
        }
      });
  }


}