import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'command-lost-404',
  templateUrl: './lost-404.component.html',
  styleUrls: ['./lost-404.component.scss']
})
export class Lost404Component implements OnInit {
  quoteIndex = 0;
  inspirationalQuotes = [
    'We build our computer (systems) the way we build our cities: over time, without a plan, on top of ruins.',
    'Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.',
    'A primary cause of complexity is that software vendors uncritically adopt almost any feature that users want.',
    'No one in the brief history of computing has ever written a piece of perfect software. It\'s unlikely that you\'ll be the first.',
    'Java is to JavaScript as ham is to hamster.',
    'One of the best programming skills you can have is knowing when to walk away for awhile.'
  ];
  randomQuote: string;

  constructor() { }

  ngOnInit() {
    this.updateQuote();
  }

  getQuoteIndex(): number {
    let newIndex = this.getRandomInt(this.inspirationalQuotes.length);
    while (true) {
      if (newIndex !== this.quoteIndex) {
        break;
      } else {
        newIndex = this.getRandomInt(this.inspirationalQuotes.length);
      }
    }
    return newIndex;
  }

  updateQuote() {
    this.quoteIndex = this.getQuoteIndex();
    this.randomQuote = this.inspirationalQuotes[this.quoteIndex];
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
