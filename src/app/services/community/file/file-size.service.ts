import { Injectable } from '@angular/core';
import { File } from 'src/app/models/remote-applications/file.model';


// errechnen der aktuellen Gesamtgröße aller zu kopierenden Files

@Injectable({
  providedIn: 'root'
})
export class FileSizeService {
  sizeAllFiles:number;
  public sizeInKB: number;
/**
 *errechnen der aktuellen Gesamtgröße aller zu kopierenden Files
 *
 * @param {File} file
 * @memberof LoggingService
 */
changeSize(file:File){
      if(file.shouldCopy){
        this.sizeAllFiles = this.sizeAllFiles + file.mediaSize;
      }else{
        this.sizeAllFiles = this.sizeAllFiles - file.mediaSize;
      }
      if(this.sizeAllFiles < 0){
          this.sizeAllFiles = 0;
      }
      this.sizeInKB = this.sizeAllFiles / 1000;
  }

getSize():number{
    return this.sizeInKB;
}

  constructor() { 
      this.sizeAllFiles = 0;
      this.sizeInKB = 0;
  }
}