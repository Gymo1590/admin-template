import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment.prod';
import {LoanDataInterface} from "../loans/loan.data.interface"

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

 
  createLoan(LoanDataInterface: LoanDataInterface): Observable<LoanDataInterface> {
    return this.http.post<LoanDataInterface>(`${this.baseUrl}`, LoanDataInterface);
  }
 
  getLoanById(id: number): Observable<LoanDataInterface> {
    return this.http.get<LoanDataInterface>(`${this.baseUrl}/${id}`);
  }
 
  updateLoan(id: number, LoanDataInterface: LoanDataInterface): Observable<LoanDataInterface> {
    return this.http.put<LoanDataInterface>(`${this.baseUrl}/${id}`, LoanDataInterface);
  }

  updateLoanStatus(id: number, action:string, data:any): Observable<any> {
    var link = '';
    if(data === 'approve'){
      link = '/loans/approve/'
    }
    if(data === 'disburse'){
      link = '/loans/disburse/'
    }
    return this.http.put<any>(`${this.baseUrl}${link}/${id}`, data);
  }

  getActiveLoans(): Observable<LoanDataInterface> {
    return this.http.get<LoanDataInterface>(`${this.baseUrl}/loans/active`);
  }

  getClosedLoans(): Observable<LoanDataInterface> {
    return this.http.get<LoanDataInterface>(`${this.baseUrl}/loans/closed`);
  }

 
}
