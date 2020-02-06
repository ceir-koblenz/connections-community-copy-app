import { Component, OnInit } from '@angular/core';
import {LoggingService} from 'src/app/services/logging/logging.service';

// Komponente zum anzeigen der Logs

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  constructor(public loggingservice: LoggingService) { }

  ngOnInit() {
  }

}
