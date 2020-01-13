import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from 'src/app/services/community/layout/layout.service';
import { LayoutCollection } from 'src/app/models/layout-collection.model';
import { EntityLink } from 'src/app/common/entity-link';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input() layoutCollection: EntityLink<LayoutCollection>;

  constructor(private service: LayoutService) { }

  async ngOnInit() {
    await this.service.loadCollection(this.layoutCollection);
  }

}
