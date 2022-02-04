import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private httpClient: HttpClient) { }
    getAll() {
      return this.httpClient.get(`${environment.apiEndPoint}/student/get`)
    }
  
    addAllData(payload: any) {
      return this.httpClient.post(`${environment.apiEndPoint}/student/add` ,payload)
    }

    updateAllData(payload: any) {
      return this.httpClient.post(`${environment.apiEndPoint}/student/update` ,payload)
    }

    deleteAllData(id: string) {
      return this.httpClient.delete(`${environment.apiEndPoint}/student/delete?id=${id}`)
    }



    // User Crud

    getUser() {
      return this.httpClient.get(`${environment.apiEndPoint}/user/get`)
    }

    addUser(item: any) {
      return  this.httpClient.post(`${environment.apiEndPoint}/user/add` ,item)
    }

    updateUser(item: any) {
      return this.httpClient.post(`${environment.apiEndPoint}/user/update` ,item)
    }

    deleteUser(id: string) {
      return   this.httpClient.delete(`${environment.apiEndPoint}/user/delete?id=${id}`)
    }
}
