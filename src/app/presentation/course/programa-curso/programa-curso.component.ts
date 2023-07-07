import { Component, Input } from '@angular/core';
import { CursoDomainEntity } from 'src/app/domain/entities/curso.entity.domain';

@Component({
  selector: 'app-programa-curso',
  templateUrl: './programa-curso.component.html',
  styleUrls: ['./programa-curso.component.css'],
})
export class ProgramaCursoComponent {
  @Input() curso: CursoDomainEntity = {} as CursoDomainEntity;
  
  constructor() {}
}