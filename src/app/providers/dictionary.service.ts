import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  dictionarySubject: BehaviorSubject<any>;
  fileURL = 'https://raw.githubusercontent.com/JacobSamro/ngx-spellchecker/master/dict/normalized_en-US.dic';

  constructor(private httpClient: HttpClient) {
    this.dictionarySubject = new BehaviorSubject<any>(null);
    this.initialize();
  }

  get dictionary() {
    return this.dictionarySubject.value;
  }

  initialize() {
    this.httpClient.get(this.fileURL, { responseType: 'text' }).subscribe((res) => {
      this.dictionarySubject.next(res);
    });
  }
}
