import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment/enviroment.prod';
import { map, Observable } from 'rxjs';
import { MarketDataInterfce } from './markets.data.interface';

@Injectable({
  providedIn: 'any'
})
export class MarketService{
private baseUrl   =  environment.baseUrl;
  constructor(private http:HttpClient) { }

  createMarket(data:Object): Observable<any>{
    return this.http.post(`${this.baseUrl}/entity/markets/create`, data);
  }

  updateMarket(id:number, data: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/entity/markets/${id}/edit`,data);
  }
  getAllMarkets(): Observable<MarketDataInterfce[]> {
    return this.http.get<any[]>(`${this.baseUrl}/entity/markets`).pipe(
      map((markets: any[]) => markets.map(market => this.transformMarket(market)))
    );
  }

  getMarketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/entity/markets/${id}`);
  }

  private transformMarket(market: any): MarketDataInterfce {
    return {
      id: market.id,
      name: market.name,
      location: market.address,                       
      stallNumber: String(market.stallCount),          
      vendorCount: market.vendorCount,
      zoneCount: market.zoneCount
    };
  }
  getRegions():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/entity/markets/regions`);
  }

}
