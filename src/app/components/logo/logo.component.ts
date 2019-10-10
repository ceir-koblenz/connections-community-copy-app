import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Logo } from 'src/app/models/logo.model';
import { EntityLink } from 'src/app/common/entity-link';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.sass']
})
export class LogoComponent implements OnInit {

  @Input() logo: EntityLink<Logo>;

  /* 
  * Variable für das Image, das im Formular angezeigt und beim
  * Ändern geupdatet wird, damit das ausgewählte Bild angezeigt wird.
  */
  imageBlobUrl: String;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // Set existing community image as default
    // Set existing community image as default
    this.imageBlobUrl = this.logo.url.href;
    this.logo.model = new Logo();
  }

  /*
  * Event Listener für ein geändertes Logo
  * Speichert das neue Logo als Blob in community.logo.new.
  * Zusätzlich wird es durch imageBlobUrl in der Komponente angezeigt.
  */
  logoChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let fr = new FileReader();
      fr.onload = (event: any) => {
        let base64 = event.target.result
        let img = base64.split(',')[1]
        let blob = new Blob([window.atob(img)], { type: 'image/jpeg' })
        this.logo.model.blob = blob
        this.imageBlobUrl = base64
      }
      fr.readAsDataURL(file)
    } else{
      this.logo.model.blob = null;
      this.imageBlobUrl = "";
    }
  }

}
