import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { map } from 'rxjs/internal/operators'

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private url: string) {

  }
  getBanners(): Observable<Banner[]> {
    return this.http.get(`${this.url}banner`).pipe(map((res: { banners: Banner[] }) => res.banners))
  }
  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.url + 'playlist/hot').pipe(map((res: { tags: HotTag[] }) => {
      return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5)
    }))
  }
  getPersonalSheetList(): Observable<SongSheet[]> {
    return this.http.get(this.url + 'personalized').pipe(map((result: { tags: SongSheet[] }) => result.tags.slice(0, 16)))
  }
}
