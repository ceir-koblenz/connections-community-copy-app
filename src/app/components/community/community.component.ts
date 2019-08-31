import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.sass']
})
export class CommunityComponent implements OnInit {
  
  title = 'community';
  constructor(
    private route: ActivatedRoute
    ) {}

  ngOnInit() {
    const id = this.getCommunity();
  }

  getCommunity(): number {
    const id2 = +this.route.snapshot.paramMap.get('id');
    console.log("ID = " + id2);
    return id2;
  }

}