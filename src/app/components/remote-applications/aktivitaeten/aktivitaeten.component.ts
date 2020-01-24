import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { AktivitaetenCollectionXmlParser } from 'src/app/xml-parser/remote-applications/aktivitaeten-collection-xml-parser';
import { AktivitaetenCollection } from 'src/app/models/remote-applications/aktivitaeten-collection.model';
import { RemoteApplication } from 'src/app/models/remoteapplication.model';
import { EntityLink } from 'src/app/common/entity-link';
import { Aktivitaet } from 'src/app/models/remote-applications/aktivitaeten.model';
import { AktivitaetenService } from 'src/app/services/community/aktivitaeten/aktivitaeten.service';
import { ProcessTypeService } from 'src/app/services/process-type.service';
import { ProcessType } from 'src/app/common/process-type';

@Component({
  selector: 'app-aktivitaeten',
  templateUrl: './aktivitaeten.component.html',
  styleUrls: ['./aktivitaeten.component.sass']
})
export class AktivitaetenComponent implements OnInit {

  @Input() remoteApplication: EntityLink<RemoteApplication>;

  Aktivitaeten: AktivitaetenCollection;
  copyAll: boolean = false;

  constructor(private aktivitaetenService: AktivitaetenService,
    private processTypeService: ProcessTypeService) { }

  async ngOnInit() {
    this.Aktivitaeten = await this.aktivitaetenService.load(this.remoteApplication);

    this.processTypeService.getProcessType().subscribe(x => {
      var doCopy = false;
      if (x === ProcessType.copy) {
        doCopy = true;
      } else if (x === ProcessType.createTemplate) {
        doCopy = false;
      }
      this.copyAll = doCopy;
      this._setShouldCopyAll();
    });
  }

  toggleShouldCopyAll() {
    this.copyAll = !this.copyAll;
    this._setShouldCopyAll();
  }

  toggleShouldCopy(akt) {
    akt.shouldCopy = !akt.shouldCopy;
  }

  _setShouldCopyAll() {
    // Iterate through all Aktivitaeten and update shouldCopy variable
    this.Aktivitaeten.aktivitaeten.forEach(akt => {
      akt.shouldCopy = this.copyAll;
    });
  }
}


