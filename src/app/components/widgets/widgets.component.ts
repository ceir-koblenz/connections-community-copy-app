import { Component, OnInit, Input } from '@angular/core';
import { EntityLink } from 'src/app/common/entity-link';
import { WidgetCollection } from 'src/app/models/widget-collection.model';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/services/community/widget/widget.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.sass']
})
export class WidgetsComponent implements OnInit {

  @Input() remoteWidgets: EntityLink<WidgetCollection>;

  remoteWidgetcollection: WidgetCollection;
  selectedWidget: EntityLink<Widget>;

  constructor(private widgetService: WidgetService) { }

  async ngOnInit() {
    this.remoteWidgetcollection = await this.widgetService.loadCollection(this.remoteWidgets);
  }

  onSelect(link) {
    this.selectedWidget = link;
  }
}
