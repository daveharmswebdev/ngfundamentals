import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventService,
  EventListResolver,
  EventResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator
} from './events/index';

import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';

import { 
  TOASTR_TOKEN,
  JQ_TOKEN,
  Toastr, 
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective 
} from './common/index';

import { AuthService } from './user/auth.service';

import { appRoutes } from './routes';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
      EventsAppComponent,
      EventsListComponent,
      EventThumbnailComponent,
      EventDetailsComponent,
      NavBarComponent,
      CreateEventComponent,
      Error404Component,
      CreateSessionComponent,
      SessionListComponent,
      CollapsibleWellComponent,
      DurationPipe,
      ModalTriggerDirective,
      SimpleModalComponent,
      UpvoteComponent,
      LocationValidator
    ],
  providers: [
    EventService,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    EventListResolver,
    EventResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');  
  }
  return true;
}

