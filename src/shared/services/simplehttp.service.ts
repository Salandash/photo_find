// Angular
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// 3rd parties
import 'rxjs';

@Injectable()
export class SimpleHttp {
  constructor(private http: Http) {
  }

  get() {
    return this.http.get('https://randomuser.me/api/?results=10')
      .map((response: Response) => {
        return response.json();
      });
  }
}
