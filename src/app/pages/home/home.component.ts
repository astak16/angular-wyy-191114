import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  banners: Banner[]
  carouselActiveIndex = 0

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent
  constructor(private homeServe: HomeService) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalizedSheetList()
  }
  private getBanners() {
    this.homeServe.getBanners().subscribe(banners => {
      this.banners = banners
    })
  }
  private getHotTags() {
    this.homeServe.getHotTags().subscribe(tags => {
      // this.banners = banners
    })
  }
  private getPersonalizedSheetList() {
    this.homeServe.getPersonalSheetList().subscribe(sheets => {
      // this.banners = banners
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
