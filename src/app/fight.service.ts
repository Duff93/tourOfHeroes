import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Battle } from './battle';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  private fightUrl = 'http://localhost:8080/api/battle';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getWinner(battle: Battle): Observable<Battle> {
    return this.http.post<Battle>(this.fightUrl, battle, this.httpOptions);
  }
}
