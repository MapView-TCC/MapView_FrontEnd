import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]',
  standalone: true
})
export class NextDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  nextFunc() {
    const sliderMain = this.el.nativeElement.parentElement.parentElement.querySelector('.slider-main') as HTMLElement;
    const items = Array.from(sliderMain.children) as HTMLElement[];
    const firstItem = items[0];
    sliderMain.append(firstItem); // Move o primeiro item para o final
    this.updateActiveItem(sliderMain);
  }

  private updateActiveItem(sliderMain: HTMLElement) {
    const items = Array.from(sliderMain.children) as HTMLElement[];
    const centerIndex = Math.floor(items.length / 2);
    items.forEach((item, index) => {
      item.classList.toggle('active', index === centerIndex);
    });
  }
}