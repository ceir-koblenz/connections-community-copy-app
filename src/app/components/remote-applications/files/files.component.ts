import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { FileCollectionXmlParser } from 'src/app/xml-parser/remote-applications/file-collection-xml-parser';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileService } from 'src/app/services/community/file/file.service';
import { FolderService } from 'src/app/services/community/file/folder.service';
import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';
import { Folder } from 'src/app/models/remote-applications/folder.model';
import { File } from 'src/app/models/remote-applications/file.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  files: FileCollection;
  folder: FolderCollection;

  constructor(private apiClient: ApiClientService, private fileService: FileService, private folderService: FolderService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadFileFeed();
    this.remoteApplication.model.shouldCopy = true; //TODO: nur für Processbar test! Issue #56 soll das steuern!
  }

  setShouldCopy(folder:Folder, file:File) {    
    file.shouldCopy = !file.shouldCopy;
    if (file.shouldCopy) {
      // check if it is necessary to copy folder
      folder.shouldCopy = folder.isFileSelected();
    }    
  }

  setShouldCopyFolder(xFolder:Folder) {
    // Iterate through all files and folders in folder and update shouldCopy variable
    Folder.markAllShouldCopy(xFolder, !xFolder.shouldCopy);
  }

  async loadFileFeed() {
    this.folder = await this.folderService.load(this.remoteApplication);
  }

}
