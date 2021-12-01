import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private load: LoaderService) { }

  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      tap(e=>{
        setTimeout(()=> {
          this.load.isLoading.next(true)
      }, 0);
      
      }),
      finalize(()=>{
        setTimeout(()=> {
          this.load.isLoading.next(false)
      }, 0);
      })
    )
  }
}
