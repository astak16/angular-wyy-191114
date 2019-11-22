import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core'


@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  @ViewChild('dot', { static: true }) dotRef: TemplateRef<any>;
  @Input() activeIndex = 0
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>()
  constructor() { }

  ngOnInit() {
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type)
  }

}
