import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

export class Products{
  _id!: String;
  name!:String;
  price!:String;
  descript!:String;
  pic!:String;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';


  //Http Header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');


  constructor(private httpClient: HttpClient) { }

  //Add
  AddProduct(data:Products): Observable<any>{
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient.post(API_URL,data)
    .pipe(catchError(this.handleError)
    )
  }
  //Get All Product
  GetProducts(){
    return this.httpClient.get(`${this.REST_API}`);
  }


  //Get single Product
  GetProduct(id: any):Observable<any>{
    let API_URL = `${this.REST_API}/detail-product/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }
  //Update
  updateProduct(id:any,data:any):Observable<any>{
    let API_URL = `${this.REST_API}/update-product/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Delete
  deleteProduct(id:any): Observable<any>{
    let API_URL = `${this.REST_API}/delete-product/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }

  // Error
  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
    // Handle client error
    errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage);
  }
}