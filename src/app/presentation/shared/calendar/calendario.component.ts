import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, addMonths, subMonths } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { loginUseCaseProviders } from 'src/app/infrastructure/delegate/delegete-login/delegate-login.infrastructure';
import { usuarioUseCaseProviders } from 'src/app/infrastructure/delegate/delegate-usuario/delegate-usuario.infrastructure';
import { UsuarioService } from 'src/app/domain/services/usuario.service.domain';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{
  delegateLogin = loginUseCaseProviders;
  delegateUsuario = usuarioUseCaseProviders;

  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  selectedDateEvents: CalendarEvent[] = [];
  selectedDate: Date = new Date();
  rol!: number;
  isAdmin?: boolean = false;

  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService
  ) {}

  openDayModal(day: any, content: any) {
    this.selectedDate = day.date;
    this.selectedDateEvents = day.events;
    this.modalService.open(content, { size: 'lg' });
  }

  addEvent() {
    const title = prompt('Nombre de la actividad:');
    const expositor = prompt('Nombre del expositor:');
    if (title && expositor) {
      this.events = [
        ...this.events,
        {
          start: startOfDay(this.selectedDate),
          title,
          meta: {
            expositor
          }
        }
      ];
      this.selectedDateEvents = this.events.filter(
        event => startOfDay(event.start).getTime() === startOfDay(this.selectedDate).getTime()
      );
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(e => e !== eventToDelete);
    this.selectedDateEvents = this.selectedDateEvents.filter(e => e !== eventToDelete);
  }

  prevMonth() {
    this.viewDate = subMonths(this.viewDate, 1);
  }
  
  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  actualizarRol() {
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .execute();
    this.delegateLogin.hasRolUseCaseProvider
      .useFactory(this.usuarioService)
      .statusRolEmmit.subscribe((status: number) => {
        this.rol = status;
       
        if (status === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      });
  }

  
}
