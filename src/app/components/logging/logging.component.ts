import { Component, OnInit } from '@angular/core';
import {LoggingService} from 'src/app/services/logging/logging.service';


@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.sass']
})
export class LoggingComponent implements OnInit {

  constructor(public loggingservice: LoggingService) { }

  ngOnInit() {
  }

}
