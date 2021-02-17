import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderDashService {
  public $reloadData = new Subject<null>();

  reloadOnClick(){
    return this.$reloadData.next();
  }
}
