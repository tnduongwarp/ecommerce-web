import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { RestApiService } from './rest-api.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public refreshTokenApiUrl = 'http://localhost:3000/auth/refresh-token';
  public refreshToken;
  constructor(private http: HttpClient,private restApiService: RestApiService, private router: Router) {
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('auth')) {
          // Nếu lỗi là 401 và không phải là request lấy lại access token, thử lấy lại access token
          return this.http.post(this.refreshTokenApiUrl, {refreshToken: this.refreshToken})
          .pipe(
            switchMap((res: any) => {
              localStorage.setItem('accessToken', res?.accessToken);
              // Thực hiện lại request gốc sau khi lấy lại access token
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${res?.accessToken}`
                }
              });
              return next.handle(request);
            }),
            catchError((refreshError) => {
              // Xử lý lỗi khi không thể lấy lại access token
              localStorage.clear();
              this.router.navigateByUrl('/login')
              return throwError(refreshError);
            })
          );
        }
        // Nếu không phải lỗi 401 hoặc không thể lấy lại access token, trả về lỗi ban đầu
        return throwError(error);
      })
    );
  }
}
