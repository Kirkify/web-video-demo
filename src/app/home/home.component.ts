import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {INavLink, NavLinkService} from '../services/nav-link.service';

declare var MediaElementPlayer: any;
declare var mejs: any;

@Component({
  selector: 'command-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  navLinks$: Observable<INavLink[]>;

  constructor(private navLinkService: NavLinkService) {
    this.navLinks$ = this.navLinkService.getLinks();
  }

  ngOnInit() {
  }

}
