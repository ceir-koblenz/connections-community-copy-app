import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FolderService } from 'src/app/services/community/file/folder.service';
import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';
import { Folder } from 'src/app/models/remote-applications/folder.model';
import { File } from 'src/app/models/remote-applications/file.model';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  files: FileCollection;
  folder: FolderCollection;

  constructor(private folderService: FolderService,
    private processTypeService: ProcessTypeService) { }

  async ngOnInit() {
    this.folder = await this.folderService.load(this.remoteApplication);

    this.processTypeService.getProcessType().subscribe(x => {
      var doCopy = false;
      if (x === ProcessType.copy) {
        doCopy = true;
      } else if (x === ProcessType.createTemplate) {
        doCopy = false;
      }
      this.folder.folders.forEach((x) => Folder.markAllShouldCopy(x, doCopy));
    });
  }

  setShouldCopy(folder: Folder, file: File) {
    file.shouldCopy = !file.shouldCopy;
    if (file.shouldCopy) {
      // check if it is necessary to copy folder
      folder.shouldCopy = folder.isFileSelected();
    }
  }

  setShouldCopyFolder(xFolder: Folder) {
    // Iterate through all files and folders in folder and update shouldCopy variable
    Folder.markAllShouldCopy(xFolder, !xFolder.shouldCopy);
  }
}
