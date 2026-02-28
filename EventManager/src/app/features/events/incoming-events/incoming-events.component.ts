import {Component} from '@angular/core';
import {activityService} from '../../../shared/servies/activity.service';
import {Activity} from '../../../shared/models/activity';
import {AuthService} from "../../../core/services/auth.service";


@Component({
  selector: 'app-incoming-events',
  templateUrl: './incoming-events.component.html',
  styleUrls: ['./incoming-events.component.sass']
})
export class IncomingEventsComponent {

  activities: Activity[] = []
  isLoggedIn: boolean = false
  userFollowingMap: { [activityId: number]: boolean } = {};

  constructor(private _api: activityService, private _auth: AuthService) {
    _api.getNextActivities().subscribe({
      next: activities => {
        const activityArray = activities as Activity[]
        activityArray.forEach(activity =>{
          console.log(activity.isCancel)
        })
        this.activities = activityArray.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        this._api.getUserActivities().subscribe(userActivities => {
          const userActivitiesArray: Activity[] = userActivities as Activity[];
          for (const id of userActivitiesArray) {
            console.log(id.id)
            this.userFollowingMap[id.id] = true;
          }
          console.log(this.userFollowingMap)
        })
      }
    });

    this._auth.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  followActivity(id: number): void {
    this._api.followActivity(id)
    this.userFollowingMap[id] = true
  }

  unfollowActivity(id: number): void {
    this._api.unfollowActivity(id)
    this.userFollowingMap[id] = false
  }
}
