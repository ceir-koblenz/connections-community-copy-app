// Enum mit den verschiedene loglevel typen
export enum loglevel{
    None = 'None',
    Info = 'Info' ,
    Warning = 'Warning' 
}

// Klasse stellt einen Logeintrag mit einer Message und einem Loglevel dar
export class LogEntry {

    LogLevel : loglevel;
    Message  : String;

    constructor(message : String, level : loglevel){
        this.Message = message;
        this.LogLevel = level;
    }

    
}
