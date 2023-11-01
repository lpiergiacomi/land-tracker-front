import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../backend/services/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {FileInfo} from "../../backend/model/FileInfo";

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit{
  currentFile?: File;

  fileName = 'Seleccione archivo';
  fileInfos?: FileInfo[];

  constructor(private fileUploadService: FileUploadService, public toastr: ToastrService) {
  }

  async ngOnInit() {
    this.fileInfos = await this.fileUploadService.getFiles();
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Seleccione archivo';
    }
  }



  async upload() {
    if (this.currentFile) {
      try {
        await this.fileUploadService.upload(this.currentFile);
        this.fileInfos = await this.fileUploadService.getFiles()
        this.toastr.success(`Archivo subido correctamente`);
      } catch (error) {
        this.currentFile = undefined;
        this.toastr.error(error);
      }
    }

  }

  async downloadFile(id: string, type: string) {
    try {
      const resultBlob = await this.fileUploadService.getFileById(id);
      const downloadURL = URL.createObjectURL(new Blob([resultBlob], {type: type}));
      window.open(downloadURL);
    } catch (error) {
      this.toastr.error(error);
    }
  }
}
