import { HTTP_INTERCEPTORS } from '@angular/common/http';

import{ HttpParamInterceptor}from './http-params-interceptor'

export const httpInterceptorProviders=[
  { provide: HTTP_INTERCEPTORS, useClass:HttpParamInterceptor, multi:true},
];
