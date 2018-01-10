import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../interceptors/token-interceptor.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  // Application wide shared services should all be registered here
  providers:    [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

export class UserServiceConfig {
}
