import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, SongSheet, HotTag, Singer } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/services/singer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  hotTags: HotTag[]
  songSheetList: SongSheet[]
  singers: Singer[]
  carouselActiveIndex = 0

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService
  ) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalizedSheetList()
    this.getEnterSingers()

  }
  private getBanners() {
    this.homeServe.getBanners().subscribe(banners => {
      this.banners = banners
    })
  }
  private getHotTags() {
    this.homeServe.getHotTags().subscribe(tags => {
      this.hotTags = tags
    })
  }
  private getPersonalizedSheetList() {
    this.homeServe.getPersonalSheetList().subscribe(sheets => {
      this.songSheetList = sheets
    })
  }
  private getEnterSingers() {
    this.singerServe.getEnterSinger().subscribe(singers => {
      this.singers = singers
    })
  }

  ngOnInit() {
  }
  onBeforeChange({ to }) {
    this.carouselActiveIndex = to
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]()
  }

}
