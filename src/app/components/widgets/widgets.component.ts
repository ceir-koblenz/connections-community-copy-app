import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { ApiClientService } from 'src/app/services/api-client/api-client.service';
import { WidgetCollectionXmlParser } from 'src/app/xml-parser/widget-collection-xml-parser';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { Widget } from 'src/app/models/widget.model';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.sass']
})
export class widgetsComponent implements OnInit {

  @Input() remoteWidgets: EntityLink<WidgetCollection>;

  client: ApiClientService;
  remoteWidgetcollection: WidgetCollection;
  selectedWidget: EntityLink<Widget>;

  constructor(private apiClient: ApiClientService) {
    this.client = apiClient;
  }

  ngOnInit() {
    this.loadWidgets();
  }

  onSelect(link) {
    this.selectedWidget = link;
  }

  async loadWidgets() {
    var xmlString = await this.client.loadXML(this.remoteWidgets.url); // Raw XML laden

    var xmlParser: WidgetCollectionXmlParser = new WidgetCollectionXmlParser()
    this.remoteWidgetcollection = new WidgetCollection;

    xmlParser.fillFromXml(this.remoteWidgetcollection, xmlString);
  }

}
