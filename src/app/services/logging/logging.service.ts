import { Injectable } from '@angular/core';
import { LogEntry } from 'src/app/services/logging/log-entry';
import {loglevel} from 'src/app/services/logging/log-entry';


//hier werden LogEntrys mithilfe der verschidenen Funktionen erstellt und im Array des Service gespeichert

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  logs: LogEntry[] = [];

  // sorgt dafür ,dass nicht mehr als 5 Logs im Array sind
  private CorrectLogs(){
    if (this.logs.length>= 5){
      this.logs.shift();
    }
  }

  LogInfo(message: string) {
    let entry = new LogEntry(message, loglevel.Info);
    this.CorrectLogs();
    this.logs.push(entry);
  }

  LogWarning(message :String){
    let entry = new LogEntry(message, loglevel.Warning);
    this.CorrectLogs();
    this.logs.push(entry);
  }

  Log(message :String, loglevel :loglevel){
    let entry = new LogEntry(message, loglevel);
    this.CorrectLogs();
    this.logs.push(entry);
  }


  constructor() { }
}
