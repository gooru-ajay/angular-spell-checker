import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  forwardRef,
  Input,
  OnInit,
  HostBinding,
  ViewChild
} from '@angular/core';
import { SpellCheckerService } from 'ngx-spellchecker';
import { DictionaryService } from '@providers/dictionary.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounce } from '@app/debounce.decorator';

@Directive({
  selector: '[contenteditable]',
  providers:
    [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ContentEditableFormDirective),
        multi: true
      }
    ]
})
export class ContentEditableFormDirective implements ControlValueAccessor {
  @HostBinding('attr.contenteditable') enabled = true;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  private removeDisabledState: () => void;

  get dictionary() {
    return this.dictionaryService.dictionary;
  }

  constructor(private dictionaryService: DictionaryService, private elementRef: ElementRef, private renderer: Renderer2, private spellCheckerService: SpellCheckerService) { }

  @HostListener('input')
  @debounce()
  onInput(): void {
    let innerText = this.elementRef.nativeElement.innerText;
    let html = '';
    const dictionary = this.spellCheckerService.getDictionary(this.dictionary);
    const splitedTexts = innerText.trim().split(/\s+/);
    splitedTexts.forEach((word, index) => {
      if (!dictionary.spellCheck(word)) {
        html += `<span class="spell">${word}</span>`
        if (index !== (splitedTexts.length - 1)) {
          html += '&nbsp';
        }
      } else {
        html += `<span>${word}</span>`;
        if (index !== (splitedTexts.length - 1)) {
          html += '&nbsp';
        }
      }
    });
    html += '&nbsp';
    this.writeValue(html);
  }

  @HostListener('blur') onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', value || '');
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.enabled = !disabled;
  }
}
