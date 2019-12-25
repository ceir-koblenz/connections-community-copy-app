export class ProcessStatus {
    value: number = 0;
    logList: Array<string> = new Array<string>();
    openCounter: number = 0;
    doneCounter: number = 0;    

    countUp() {
        this.doneCounter += 1;
        this.updateValue();
    }

    updateValue() {
        this.value = Math.floor((this.doneCounter / this.openCounter) * 100);
    }

    log(string) {
        this.logList.push(string);
    }
}
