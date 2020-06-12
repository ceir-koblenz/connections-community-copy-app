import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConfig } from './app-config';
import { environment } from 'src/environments/environment';

/**
 * Interceptor, welcher für Requests gegen die Connections-Api den Header {withCredentials: true} einfügt.
 * Dadurch werden per SSO verfügbaren Tokens zur Authentifizierung der Requests verwendet.
 * @export
 * @class ProdHttpInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class ProdHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith(getConfig().connectionsUrl.toString())) {
            // allen Requests gegen die connectionsUrl wird withCredentials: true mitgegeben
            req = req.clone({
                withCredentials: true
              });
              
            return next.handle(req);
        }

        return next.handle(req);
    }
}