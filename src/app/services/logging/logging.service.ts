import { Injectable } from '@angular/core';
import { LogEntry } from 'src/app/services/logging/log-entry';
import { loglevel } from 'src/app/services/logging/log-entry';


//hier werden LogEntrys mithilfe der verschidenen Funktionen erstellt und im Array des Service gespeichert

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logs: LogEntry[] = [];

  LogInfo(message: string) {
    let entry = new LogEntry(message, loglevel.Info);
    this.logs.push(entry);
  }

  LogWarning(message: String) {
    let entry = new LogEntry(message, loglevel.Warning);
    this.logs.push(entry);
  }

  LogError(message: String) {
    this.logs.push(new LogEntry(message, loglevel.Error));
  }

  Log(message: String, loglevel: loglevel) {
    let entry = new LogEntry(message, loglevel);
    this.logs.push(entry);
  }


  constructor() { }
}
