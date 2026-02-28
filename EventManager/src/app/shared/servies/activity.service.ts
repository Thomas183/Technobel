import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Activity} from '../models/activity';
import {BadResponse} from "../models/bad-response";
import {Member} from "../models/member";

@Injectable({
  providedIn: 'root'
})
export class activityService {

  url: string = 'https://localhost:7245/api'

  constructor(private _httpClient: HttpClient) {

  }

  getActivityById(id: number): Observable<Activity> {
    return this._httpClient.get<Activity>(`${this.url}/Activity/${id}`)
  }

  getNextActivities(): Observable<Activity[] | BadResponse> {
    return this._httpClient.get<Activity[] | BadResponse>(this.url + '/Activity/NextActivities')
  }

  getUserActivities(): Observable<Activity[] | BadResponse> {
    return this._httpClient.get<Activity[] | BadResponse>(this.url + '/Activity/MyActivities')
  }

  createActivity(activity: Activity) : void {
    this._httpClient.post<null | BadResponse>(this.url + '/Activity', activity).subscribe({
      next: response => {
        console.log('Activity sent to api', response)
      },
      error: error => {
        console.log('Activity creation failed', error)
      }
    })
  }

  followActivity(id: number) : void {
    this._httpClient.post<null | BadResponse>(`${this.url}/Registration/Join/${id}`, {nbGuest: 1}).subscribe({
      next: response => {
        console.log('Activity followed :', response)
      },
      error: error => {
        console.log('Activity follow failed :', error)
      }
    })
  }

  unfollowActivity(id: number) : void {
    this._httpClient.post<null | BadResponse>(`${this.url}/Registration/Leave/${id}`, id).subscribe({
      next: response => {
        console.log('Activity left', response);
      },
      error: error => {
        console.log('Activity leave failed', error);
      }
    })
  }

  editActivity(activity: Activity, id: number): Observable<null | BadResponse> {
    return this._httpClient.put<null | BadResponse>(`${this.url}/Activity/${id}`, activity)
  }

  deleteActivity(id: number) : Observable<Activity | BadResponse> {
    return this._httpClient.delete<Activity | BadResponse>(`${this.url}/Activity/${id}`)
  }

  cancelActivity(id: number) : Observable<Activity | BadResponse>{
    return this._httpClient.patch<Activity | BadResponse>(`${this.url}/Activity/${id}/Cancel`, id)
  }
}
