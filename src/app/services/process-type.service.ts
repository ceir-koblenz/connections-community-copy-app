import { Injectable } from '@angular/core';
import { ProcessType } from '../common/process-type';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessTypeService {
  public static defaultProcessType: ProcessType = ProcessType.createTemplate;
  private _processType: BehaviorSubject<ProcessType> = new BehaviorSubject<ProcessType>(ProcessTypeService.defaultProcessType);

  constructor() { }

  setProcessType(processType: ProcessType): void {
    this._processType.next(processType);
  }

  getProcessType(): Observable<ProcessType> {
    return this._processType.asObservable();
  }
}
