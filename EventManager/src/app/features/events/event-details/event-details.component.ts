import {Component} from '@angular/core';
import {ActivatedRoute, Route} from "@angular/router";
import {switchMap} from "rxjs";
import {Activity} from "../../../shared/models/activity";
import {AuthService} from "../../../core/services/auth.service";
import {activityService} from "../../../shared/servies/activity.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.sass']
})
export class EventDetailsComponent {

  activityId? : number
  activity? : Activity
  isCreator : boolean = false

  constructor(route: ActivatedRoute, api: activityService) {
    route.paramMap.pipe().subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.activityId = parseInt(id)
      }
    })

    if (this.activityId) {
      api.getActivityById(this.activityId).subscribe(activity => {
        this.activity = activity
        this.isCreator = activity.creatorId === parseInt(localStorage.getItem('id')!)
      })
    }
  }
}
