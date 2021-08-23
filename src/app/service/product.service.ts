import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = `${environment.url}products`;
  constructor(private http: HttpClient,
    private snackBar:MatSnackBar) { }


  verMsg(msg:string,isError:boolean=false):void{
    console.log(msg)
    this.snackBar.open(msg,'X',{
      duration:3000,
      horizontalPosition:"right",
      verticalPosition:"top",
      panelClass: isError ? ['msgError'] : ['msgSucess']
    })

  }

  create(product: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, product);
  }

  update(id:any,product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, product);
  }

  delete(id:any,): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getProductBy(name:any){
    return this.http.get<any>(`${this.baseUrl}/specialties/${name}`);
  }

  readAll(){
    return this.http.get<any>(this.baseUrl);
  }

  readById(id:any){
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
