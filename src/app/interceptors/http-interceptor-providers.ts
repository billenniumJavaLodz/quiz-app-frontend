import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpParamInterceptor } from './http-params-interceptor'
import { LoaderInterceptor } from './loader-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpParamInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
];
