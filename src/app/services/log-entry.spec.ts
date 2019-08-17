import { LogEntry, loglevel } from './log-entry';

describe('LogEntry', () => {
  it('should create an instance', () => {
    expect(new LogEntry('Default',loglevel.None)).toBeTruthy();
  });
});
