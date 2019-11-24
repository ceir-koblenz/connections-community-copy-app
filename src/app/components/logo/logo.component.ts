import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Logo } from 'src/app/models/logo.model';
import { EntityLink } from 'src/app/common/entity-link';
import { rewriteConnectionsUrl } from 'src/app/dev-http-interceptor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  imageBlobUrl: string;

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    // Set existing community image as default
    this.imageBlobUrl = rewriteConnectionsUrl(this.logo.url.toString());
    this.logo.model = new Logo();
    this.logo.model.blob = new Blob();
    // Load existing community image
    this.getImage(this.imageBlobUrl).subscribe(
      blob => this.logo.model.blob = blob
    )
  }

  setShouldCopy() {
    this.logo.model.shouldCopy = !this.logo.model.shouldCopy;
  }

  /**
   * Image als Blob um es beim Erstellen der 
   * neuen Community wieder zu verwenden.
   * @param {string} imageUrl 
   * @returns {Observable<Blob>}
   */
  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
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
      fr.onloadend = (event: any) => {
        let base64 = event.target.result
        let binary = base64.split(',')[1]
        this.logo.model.blob = this.dataURItoBlob(binary)
        this.imageBlobUrl = base64
      }
      fr.readAsDataURL(file)
    }
  }

  /**
   * Magic Method. Nur so konnte das Bild in binary umgewandelt werden,
   * sodass Uniconnect das Bild auch lesen kann. 
   * Das hier reicht wohl nicht -.- var blob = new Blob([atob(binary)], {'type':'image/jpeg'})
   * 
   * @param dataURI 
   */
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });    
    return blob;
 }

}
