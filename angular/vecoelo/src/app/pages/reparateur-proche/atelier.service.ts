import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface AtelierResponse {
  results: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  private baseUrl = 'http://localhost:3999';

  constructor(private http: HttpClient) { }

  getAllAteliers(): Observable<any[]> {
    return this.http.get<AtelierResponse>(`${this.baseUrl}/atelier/get/atelier`).pipe(
      map((response) => response.results),
      catchError(this.handleError)
    );
  }

  getRepairShopDetails(repairShopID: string): Observable<any> { // Modification du nom de la fonction ici
    return this.http.get<any>(`${this.baseUrl}/atelier/get/atelier/${repairShopID}`);
  }
  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
