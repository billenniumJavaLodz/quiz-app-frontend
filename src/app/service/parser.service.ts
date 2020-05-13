import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParserService {
    HTML_REGEX = new RegExp("<[^>]*>", 'g');
    preTagContent = "[...]";
    
  preTagReplacer(baseHtml: string) {
    let questionHtml = document.createElement("div");
    questionHtml.innerHTML = baseHtml;

    for (let pre = 0; pre < questionHtml.getElementsByTagName("pre").length; pre++) {
      questionHtml.getElementsByTagName("pre")[pre]
        .innerHTML = this.preTagContent;

    }
    return questionHtml.innerHTML;
  }
}