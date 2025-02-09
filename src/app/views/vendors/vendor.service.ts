import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment.prod';
import { Zones } from './zones.interface';
import { Region } from './register-vendor/region.interface';

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
    return this.http.get(`${this.baseUrl}/clients/${id}`)
  }

  getMarketZones(marketId:number):Observable<Zones[]>{
    return this.http.get<any[]>(`${this.baseUrl}/entity/markets/zones/${marketId}`).pipe(
      map((zoneArray) => zoneArray.map((zone) => ({
        id: zone.zoneId,
        name: zone.zoneName,
      })))
    );
  }

  getRegions():Observable<Region[]> {
    return this.http.get<any[]>(`${this.baseUrl}/clients/regions`).pipe(
      map((region)=> region.map((data)=>({
        regionId: data.regionId,
        regionName: data.regionName,
      })))
    )
  }


}
