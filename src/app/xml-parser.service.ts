import { Injectable } from '@angular/core';
import * as Parser from 'fast-xml-parser';
import { X2jOptions } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root'
})
export class XmlParserService {

  private defaultOptions: Partial<X2jOptions> = {
    ignoreAttributes: false
  };

  parse(xmlString: string): any {
    return Parser.parse(xmlString, this.defaultOptions)
  }

  constructor() { }
}
