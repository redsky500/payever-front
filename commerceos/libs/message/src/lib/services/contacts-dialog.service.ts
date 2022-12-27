import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ContactsDialogService {
  private saveStatusSubject = new Subject();
  currentStatus = this.saveStatusSubject.asObservable();

  changeSaveStatus(isSaved: boolean) {
    this.saveStatusSubject.next(isSaved);
  }
}
