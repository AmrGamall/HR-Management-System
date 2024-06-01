import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '../interfaces/IDepartment';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeptServicesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  addDepartment(department: IDepartment): Observable<IDepartment> {
    return this.http.post<IDepartment>(`${this.baseUrl}/Department`, department);
  }
  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.baseUrl}/department`);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Department/${id}`);
  }
  getById(id: number): Observable<IDepartment> {
    return this.http.get<IDepartment>(`${this.baseUrl}/Department/${id}`);
  }


}
