import { Component, OnInit, Input } from '@angular/core';
import { Folder } from 'src/app/models/remote-applications/folder.model';
import { File } from 'src/app/models/remote-applications/file.model';

@Component({
  selector: 'app-subfolder',
  templateUrl: './subfolder.component.html',
  styleUrls: ['./subfolder.component.css']
})
export class SubfolderComponent implements OnInit {

  @Input() folder: Folder;

  constructor() {
  }

  ngOnInit() {
  }

  setShouldCopy(folder:Folder, file:File) {
    file.shouldCopy = !file.shouldCopy;
    if (file.shouldCopy) {
      // check if it is necessary to copy folder
      folder.shouldCopy = folder.isFileSelected();
      Folder.markParentShouldCopy(folder, true);
    }   
  }

  setShouldCopyFolder(xFolder:Folder) {
    // Iterate through all files and folders in folder and update shouldCopy variable
    Folder.markAllShouldCopy(xFolder, !xFolder.shouldCopy);
  }

}
