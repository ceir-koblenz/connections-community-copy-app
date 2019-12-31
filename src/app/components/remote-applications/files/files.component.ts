import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { FileCollectionXmlParser } from 'src/app/xml-parser/remote-applications/file-collection-xml-parser';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileService } from 'src/app/services/community/file/file.service';
import { FolderService } from 'src/app/services/community/file/folder.service';
import { FolderCollection } from 'src/app/models/remote-applications/folder-collection.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.sass']
})
export class FilesComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  files: FileCollection;
  copyAll: boolean = false;
  folder: FolderCollection;

  constructor(private apiClient: ApiClientService, private fileService: FileService, private folderService: FolderService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadFileFeed();
    this.remoteApplication.model.shouldCopy = true; //TODO: nur für Processbar test! Issue #56 soll das steuern!
  }

  setShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all wikis and update shouldCopy variable
    this.files.files.forEach(file => {
      file.shouldCopy = this.copyAll;
    });
  }

  setShouldCopy(file) {
    file.shouldCopy = !file.shouldCopy;
  }

  async loadFileFeed() {
    //this.files = await this.fileService.load(this.remoteApplication);
    //TODO: Develop folders...
    this.folder = await this.folderService.load(this.remoteApplication);
    console.log(this.folder);
    //TODO: ausgabe files und folder und subfolder mit files 
    // in html mit eigener subfolder komponete, die sich selbst 
    // aufruft.
    //TODO: ausprogrammieren create von foldern und entsprechend die files... dann finito!
  }

}
