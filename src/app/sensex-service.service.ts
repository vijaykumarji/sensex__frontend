import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';

const baseUrlList = 'http://localhost:3000/sensex/list';
const baseUrlAdd = 'http://localhost:3000/sensex/add';

@Injectable({
  providedIn: 'root'
})
export class SensexService {

  constructor(private http: HttpClient, private socket: Socket) {
  }
  // Socket event triggered by server
  getSensexMessage() {
    return this.socket.fromEvent("sensexUpdated");
  }

  // Pagination service for sensex
  getSensexList(params): Observable<any> {
    return this.http.post(baseUrlList,  params);
  }

  // Add service for sensex data
  addSensexList(params): Observable<any> {
    return this.http.post(baseUrlAdd,  params);
  }

}
