import {Component, Input, OnInit} from '@angular/core';
import {FileUploadService} from "../../backend/services/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {FileInfo} from "../../backend/model/FileInfo";
import {Lot} from "../../backend/model/lot";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input() lot: Lot;

  fileName = 'Seleccione archivo';
  fileInfos?: FileInfo[];
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  constructor(private fileUploadService: FileUploadService, public toastr: ToastrService) {
  }

  async ngOnInit() {
    this.fileInfos = await this.fileUploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  async upload(idx: number, file: File) {
    if (file) {
      try {
        await this.fileUploadService.upload(file, this.lot.id);
        this.fileInfos = await this.fileUploadService.getFiles()
        this.toastr.success(`Archivo subido correctamente`);
      } catch (error) {
        this.toastr.error(error?.error?.message);
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
