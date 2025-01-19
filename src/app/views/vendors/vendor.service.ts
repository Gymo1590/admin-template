import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment.prod';

@Injectable({
  providedIn: 'any'
})
export class VendorService {
 private baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  createVendor(data: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/clients/register`,data)
  }

  updateVendor(id:number, data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/clients/${id}/edit`,data);
  }

  getVendorById(id:number): Observable<any>{
    return this.http.get(`${this.baseUrl}clients/${id}`)
  }

  getMarketZones(marketId:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/zones/${marketId}`)

  }
}
