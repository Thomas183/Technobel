import {Component} from '@angular/core';
import {Activity} from "../../../shared/models/activity";
import {activityService} from "../../../shared/servies/activity.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.sass']
})
export class UserEventsComponent {

  userActivities : Activity[] = []

  constructor(private _api : activityService, private _router : Router) {
    _api.getUserActivities().subscribe( {
      next : activities => {
        console.log(activities)
        let activityArray = activities as Activity[]
        this.userActivities = activityArray.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      },
      error : response => {
        console.log(response);
      }
    })
  }

  unfollowActivity(id: number): void {
    this._api.unfollowActivity(id)
    this.userActivities = this.userActivities.filter(activity => activity.id !== id);
  }

}
