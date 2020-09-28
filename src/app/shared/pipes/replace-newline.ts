import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * replace new line
 * 
 * @author nguyents
 * @since 2017/01/11
 * @example Usage
 * {{ value | replaceNewline}}
 */
@Pipe({
  name: 'replaceNewline'
})
export class ReplaceNewlinePipe implements PipeTransform {
    /**
     * Inject DomSanitizer
     */
    constructor(private sanitized: DomSanitizer) {
    }

    /**
     * transform string
     * @param  val val string
     * @param escape The arguments indicates value will be escaped or not. Default is true.
     * @returns The string has replace new line
     */
  transform(val: string, escape?: string | boolean): SafeHtml {
    if (val === null || val === undefined) {
      return '';
    }
    
    let value = val;

    if (escape == true) {
      value = val.replace(/\&/gi, '&amp;')
        .replace(new RegExp('\<', 'gi'), "&lt;")
        .replace(/\>/gi, '&gt;');
    }

    value = value.replace(new RegExp('\r?\n|\r', 'gi'), "<br/>");

    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}