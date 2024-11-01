import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]',
  standalone: true
})
export class PrevDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click')
  prevFunc() {
    const sliderMain = this.el.nativeElement.parentElement.parentElement.querySelector('.slider-main') as HTMLElement;
    const items = Array.from(sliderMain.children) as HTMLElement[];
    const lastItem = items[items.length - 1];
    sliderMain.prepend(lastItem); // Move o último item para o início
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