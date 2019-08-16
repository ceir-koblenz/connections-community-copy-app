import { Injectable } from '@angular/core';
import { LogEntry } from 'src/app/components/log-entry';
import {loglevel} from 'src/app/components/log-entry';


@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logs: LogEntry[] = [];



  LogInfo(message: string) {
    let entry = new LogEntry(message, loglevel.Info);
    this.logs.push(entry);
  }

  LogWarning(message :String){
    let entry = new LogEntry(message, loglevel.Warning);
    this.logs.push(entry);
  }

  Log(message :String, loglevel :loglevel){
    let entry = new LogEntry(message, loglevel);
    this.logs.push(entry);
  }

  clear() {
    this.logs = [];
  }

  constructor() { }
}
