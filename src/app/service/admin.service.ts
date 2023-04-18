import { Injectable } from '@angular/core';
import { catchError, map} from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Products } from '../../assets/doubles/ProductStructure';

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
    let API_URL = `${this.REST_API}/add-product`;
    return this.httpClient.post(API_URL,data)
    .pipe(catchError(this.handleError)
    )
  }
  //Get All Product 
  GetProducts(): Observable<Products[]>{
    return this.httpClient.get<Products[]>(`${this.REST_API}`);
  }


  //Get single Product
  GetProduct(id: string):Observable<Products>{
    let API_URL = `${this.REST_API}/product/${id}`;
    return this.httpClient.get<Products>(API_URL,{headers:this.httpHeaders})
    .pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  //Update
  updateProduct(id:any,data:any):Observable<Products>{
    let API_URL = `${this.REST_API}/update-product/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handleError)
    )
  }
  //Delete
  deleteProduct(id:any): Observable<Products>{
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
