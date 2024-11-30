import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Input() excludeElements: string[] = [];

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(target) && !this.isExcludedElement(target, this.excludeElements)) {
      this.clickOutside.emit();
    }
  }

  private isExcludedElement(target: HTMLElement, excludeElements: string[]): boolean {
    return excludeElements.some(selectorOrClass => {
      if (selectorOrClass.startsWith('.')) {
        const className = selectorOrClass.slice(1);
        return target.classList.contains(className) || this.isInsideExcludedElement(target, `.${className}`);
      } else {
        const excludedElements = this.elementRef.nativeElement.ownerDocument.querySelectorAll(selectorOrClass) as NodeListOf<HTMLElement>;
        return Array.from(excludedElements).some(el => el.contains(target) || el === target);
      }
    });
  }

  private isInsideExcludedElement(target: HTMLElement, selector: string): boolean {
    const excludedElements = Array.from(this.elementRef.nativeElement.ownerDocument.querySelectorAll(selector)) as HTMLElement[];
    return excludedElements.some(excludedElement => excludedElement.contains(target));
  }
}
