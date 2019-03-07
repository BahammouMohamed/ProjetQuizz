import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() {
  }
  public crypt(id: any) {
    return btoa(id);
  }

  public decrypt(crypted: any) {
    return atob(crypted);
  }
}
