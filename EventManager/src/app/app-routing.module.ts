import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {LogOnComponent} from "./features/user/log-on/log-on.component";
import {IncomingEventsComponent} from "./features/events/incoming-events/incoming-events.component";
import {RegisterComponent} from "./features/user/register/register.component";
import {UserEventsComponent} from "./features/events/user-events/user-events.component";
import {CreateEventComponent} from "./features/events/create-event/create-event.component";
import {EventDetailsComponent} from "./features/events/event-details/event-details.component";
import {EditEventComponent} from "./features/events/edit-event/edit-event.component";

const routes: Routes = [
  {
    path: "home", component : HomeComponent
  },
  {
    path: "", redirectTo : 'home', pathMatch: 'full'
  },
  {
    path: "login", component : LogOnComponent
  },
  {
    path: "events", component : IncomingEventsComponent
  },
  {
    path: "userEvents", component : UserEventsComponent
  },
  {
    path: "register", component : RegisterComponent
  },
  {
    path: "createEvent", component : CreateEventComponent
  },
  {
    path: "eventDetail/:id", component : EventDetailsComponent
  },
  {
    path: "editEvent/:id", component : EditEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
