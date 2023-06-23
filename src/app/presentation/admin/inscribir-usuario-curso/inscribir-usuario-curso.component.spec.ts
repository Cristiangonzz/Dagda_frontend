import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscribirUsuarioCursoComponent } from './inscribir-usuario-curso.component';


describe('InscribirUsuarioCursoComponent', () => {
  let component: InscribirUsuarioCursoComponent;
  let fixture: ComponentFixture<InscribirUsuarioCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscribirUsuarioCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscribirUsuarioCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
