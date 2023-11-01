import { Injectable } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {FileUploadApi} from "../api/file-upload-api.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private api: FileUploadApi) { }

  async upload(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return await lastValueFrom(this.api.upload(formData));
  }

  async getFiles(): Promise<any> {
    return await lastValueFrom(this.api.getFiles());
  }

  async getFileById(id: string) {
    return await lastValueFrom(this.api.getFileById(id));
  }

}
