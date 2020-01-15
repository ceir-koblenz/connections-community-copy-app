import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { AktivitaetenCollectionXmlParser } from 'src/app/xml-parser/remote-applications/aktivitaeten-collection-xml-parser';
import { AktivitaetenCollection } from 'src/app/models/remote-applications/aktivitaeten-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';
import { AktivitaetenService } from 'src/app/services/community/aktivitaeten/aktivitaeten.service';

@Component({
  selector: 'app-aktivitaeten',
  templateUrl: './aktivitaeten.component.html',
  styleUrls: ['./aktivitaeten.component.sass']
})
export class AktivitaetenComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  client: ApiClientService;
  Aktivitaeten: AktivitaetenCollection;
  copyAll: boolean = false;
  aktivitaeten

  constructor(private apiClient: ApiClientService,private aktivitaetenService:AktivitaetenService) {
    this.client = apiClient;
  }

  async ngOnInit() {
    await this.loadAktivitaeten(); 
  }

  async loadAktivitaeten() {
    this.Aktivitaeten = await this.aktivitaetenService.load(this.remoteApplication);
  }

  setShouldCopyAll() {
    this.copyAll = !this.copyAll;
    // Iterate through all Aktivitaeten and update shouldCopy variable
    this.Aktivitaeten.aktivitaeten.forEach(akt => {
      akt.shouldCopy = this.copyAll;
    });
  }

  setShouldCopy(akt) {
    akt.shouldCopy = !akt.shouldCopy;
  }
}


