import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Singer } from './data-types/common.types';
import { map } from 'rxjs/internal/operators'
import queryString from 'query-string'


type SingerParParams = {
  offset: number
  limit: number
  cat?: string
}

const defaultParams: SingerParParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: ServicesModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) {

  }
  getEnterSinger(args: SingerParParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) })
    return this.http.get(`${this.url}artist/list`, { params }).pipe(map((res: { artists: Singer[] }) => res.artists))
  }
}
