export interface Activity {
  creatorId : number,
  description? : string,
  endDate : Date,
  id : number,
  isCancel : boolean,
  maxGuest? : number,
  name : string,
  startDate : Date
}
