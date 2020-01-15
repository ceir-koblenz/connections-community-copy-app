import { Component, OnInit, Input } from '@angular/core';
import { Wiki } from 'src/app/models/remote-applications/wiki.model';

@Component({
  selector: 'app-wiki-child',
  templateUrl: './wiki-child.component.html',
  styleUrls: ['./wiki-child.component.css']
})
export class WikiChildComponent implements OnInit {

  @Input() wiki: Wiki;

  constructor() { }

  ngOnInit() {
  }

  async setShouldCopy(xWiki:Wiki) {
    xWiki.shouldCopy = !xWiki.shouldCopy;
    
    // If wiki has a parent we need to mark the parents as well
    if (xWiki.parent && xWiki.shouldCopy) {
      Wiki.markParents(xWiki);
    }

    // If wiki has childs we need to mark the childs as well
    if (xWiki.childWikis.length > 0) {
      await Wiki.markChilds(xWiki, xWiki.shouldCopy, true);
    }
  }

}
