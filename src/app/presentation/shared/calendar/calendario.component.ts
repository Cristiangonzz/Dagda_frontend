import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{
  // view: CalendarView = CalendarView.Month;
  view: string = 'month';
  year: number = new Date().getFullYear();
  months: Date[] = Array.from({ length: 12 }, (_, i) => new Date(this.year, i, 1));

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;

  events: CalendarEvent[] = [
   
    {
      start: new Date(this.year, 3, 15),
      title: 'Evento en abril',
    }
  ];

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  // closeOpenMonthViewDay(): void {
  //  this.activeDayIsOpen = false;
  // }
  
  addEvent(date: Date) {
    const title = prompt('Escribe una anotación para este día:');
    if (title) {
      this.events = [
        ...this.events,
        {
          start: startOfDay(date),
          title,
        },
      ];
    }
  }

  
}
