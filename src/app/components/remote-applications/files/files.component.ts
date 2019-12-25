import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { EntityLink } from 'src/app/common/entity-link';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { FileCollectionXmlParser } from 'src/app/xml-parser/remote-applications/file-collection-xml-parser';
import { FileCollection } from 'src/app/models/remote-applications/file-collection.model';
import { FileService } from 'src/app/services/community/file/file.service';

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

  constructor(private apiClient: ApiClientService, private fileService: FileService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadWikiFeed();
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

  async loadWikiFeed() {
    this.files = await this.fileService.load(this.remoteApplication);
  }

}
