import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'img[default]',
    host: {
        '(error)': 'updateUrl()',
        '[src]': 'src'
    }
})
export class DefaultImageDirective {
    @Input() src: string;
    @Input() default: string = "assets/img/j_icon.png";

    updateUrl() {
        this.src = this.default;
    }
}