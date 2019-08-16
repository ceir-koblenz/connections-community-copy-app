export enum loglevel{
    None = 'None',
    Info = 'Info' ,
    Warning = 'Warning' 
}

export class LogEntry {

    LogLevel : loglevel;
    Message  : String;

    constructor(message : String, level : loglevel){
        this.Message = message;
        this.LogLevel = level;
    }

    
}
