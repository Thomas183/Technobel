import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {activityService} from "../../../shared/servies/activity.service";
import {Activity} from "../../../shared/models/activity";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.sass']
})
export class CreateEventComponent {

  date: Date = new Date()
  dateSelected : boolean = false;
  createEventForm: FormGroup

  private _dateRange: Date[] = []

  constructor(private _api : activityService, _fb: FormBuilder, private _router : Router) {
    this.createEventForm = _fb.group({
      name: [null, [Validators.required, Validators.maxLength(100)], []],
      description: [null, [Validators.maxLength(500)], []],
      startDate: [null, [Validators.required], []],
      endDate: [null, [Validators.required], []],
      maxGuest: [null, [], []],
    });
  }

  get dateRange(): Date[] {
    return this._dateRange;
  }

  set dateRange(range: Date[]) {
    this._dateRange = range;
    if (this._dateRange[0] && this._dateRange[1]) {
      this.createEventForm.get('startDate')!.setValue(this._dateRange[0]);
      this.createEventForm.get('endDate')!.setValue(this._dateRange[1]);
    }
  }

  createEvent() : void {
    if (this.createEventForm.valid){
      let activity : Activity = this.createEventForm.value as Activity
      activity.isCancel = false
      this._api.createActivity(activity)
      this._router.navigate(['/events'])
    }
  }

}
