import { Observable } from 'rxjs'
import { User } from '../../assets/doubles/UserInterface';
import { HttpClient,HttpHeaders} from '@angular/common/http';

export class UserService {

  REST_API: string = 'http://localhost:8000/api';
  apiUr: string
  headers: HttpHeaders
  _http: HttpClient

  constructor(_http, url, header) {
    this._http = _http
    this.apiUr = url
    this.headers = header
   }

   getUserData(): Observable<{ status: number, data: User }> {
    return this._http.get<{ status: number, data: User }>(`${this.REST_API}/user`, { headers: this.headers })
  }

}
