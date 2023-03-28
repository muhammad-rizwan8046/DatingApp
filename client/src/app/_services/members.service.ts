import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers()
  {
    if(this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'user').pipe(
      map(members => {
        this.members = members;
        return members;
       })
    )
  }

  getMember(userName: string)
  {
    const member = this.members.find(x => x.userName === userName)
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'user/' + userName)
  }

  updateMember(member: Member)
  {
    return this.http.put(this.baseUrl + 'user', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index]}//spread operator takes all of the elements of the member at this location in array and spreads them
      })
    )
  }

  setMainPhoto(photoId: number)
  {
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number)
  {
    return this.http.delete(this.baseUrl + 'user/delete-photo/' + photoId)
  }
}
