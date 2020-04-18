import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

export class DataService {
  /*** ROOT_URL is a variable that contains the domain root of our API. ***/
  ROOT_URL = environment.API_ENDPOINT;

  constructor(private endPoint: string, private http: HttpClient) {}

  get(param?: string, type: string = '') {
    let uri = this.ROOT_URL + this.endPoint + param;
    if (type === 'external') {
      uri = `https://services5.arcgis.com/klquQoHA0q9zjblu/arcgis/rest/services${this.endPoint}${param}`;
    }

    return this.http.get(uri)
                    .pipe(map(response => response))
                    .pipe(catchError(this.handleError));
  }

  create(params: string, resource: any) {    
    return this.http.post(this.ROOT_URL + this.endPoint + params, resource)
                    .pipe(map(response => response))
                    .pipe(catchError(this.handleError));
  }

  update(params: string, resource: any) {    
    return this.http.put(this.ROOT_URL + this.endPoint + params, resource)
                    .pipe(map(response => response))
                    .pipe(catchError(this.handleError));
  }

  delete(params: string) {    
    return this.http.delete(this.ROOT_URL + this.endPoint + params)
                    .pipe(map(response => response))
                    .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {

    if (error.status === 400) {
      return throwError(error);
    }
    if (error.status === 404) {
      return throwError(error);
    }
    return throwError(error);
  }
}
