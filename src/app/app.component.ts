import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavLinkService} from './services/nav-link.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'command-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  mobileQueryListener: () => void;
  navLinks$;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private navLinkService: NavLinkService) {
    this.navLinks$ = this.navLinkService.getLinks();
  }

  addLink() {
    this.navLinkService.addLink({
      name: 'Cool',
      route: '/',
      icon: 'send'
    });
  }
  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
