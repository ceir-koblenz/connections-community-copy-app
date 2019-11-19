import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-wrapper',
  templateUrl: './community-wrapper.component.html',
  styleUrls: ['./community-wrapper.component.sass']
})
export class CommunityWrapperComponent implements OnInit {
  private commId: string = null;

  /**
   * wird später verwendet, um Voreinstellungen bzgl. des Kopierens von Community-Teilelementen festzulegen
   */
  private selectedProcessType = null;

  constructor(private route: ActivatedRoute) {
    this.commId = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

}
