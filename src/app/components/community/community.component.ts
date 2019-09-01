import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {
  
  title = 'community';
  private commId: string = null;
  constructor(
    private route: ActivatedRoute
    ) {
      this.route.params.subscribe( params => this.commId = (params).id );
    }

  ngOnInit() {
  }

}

