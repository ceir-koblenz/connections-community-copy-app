import { Component, OnInit } from '@angular/core';
import { ProcessType, ProcessTypeLabels } from 'src/app/common/process-type';
import { ProcessTypeService } from 'src/app/services/process-type.service';

@Component({
  selector: 'app-select-process-type',
  templateUrl: './select-process-type.component.html',
  styleUrls: ['./select-process-type.component.css']
})
export class SelectProcessTypeComponent implements OnInit {

  /**
   * Macht die verfügbaren ProcessTypes samt labels fürs Dropdown im Frontend verfügbar
   *
   * @memberof SelectProcessTypeComponent
   */
  public processTypes = ProcessTypeLabels;
  /**
   * wird später verwendet, um Voreinstellungen bzgl. des Kopierens von Community-Teilelementen festzulegen
   */
  public selectedProcessType: ProcessType;

  constructor(private processTypeService: ProcessTypeService) {
    this.selectedProcessType = ProcessTypeService.defaultProcessType;
  }

  /**
   * Callback für das Ändern des selektierten Prozesstyps.
   *
   * @param {ProcessType} newValue
   * @memberof SelectProcessTypeComponent
   */
  onChange(newValue: ProcessType) {
    this.processTypeService.setProcessType(newValue)
  }

  ngOnInit() {
  }

}
