import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from "rxjs";

@Injectable()
export class FileUploadApi {
  private readonly apiController: string = 'files';

  constructor(private api: HttpService) {}

  upload(formData: FormData) {
    return this.api.post(`${this.apiController}/upload`, formData);
  }

  getFiles(): Observable<any> {
    return this.api.get(`${this.apiController}/list`);
  }

  getFileById(id: string): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`, { responseType: 'blob'});
  }

  getFilesByLotId(lotId: number) {
    return this.api.get(`${this.apiController}/list/${lotId}`);
  }
}
