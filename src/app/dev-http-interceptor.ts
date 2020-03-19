import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConfig } from './app-config';

/**
 * Interceptor, welcher Requests gegen die Connections-Api über den internen Entwicklungs-Proxy leitet.
 * Notwendig, um CORS Problematik beim Entwickeln zu umgehen (siehe auch proxy.conf.json)
 * @export
 * @class DevHttpInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class DevHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.startsWith(getConfig().connectionsUrl.toString())) {
            var newUrl = rewriteConnectionsUrl(req.url);
            // alle Requests gegen die connectionsUrl werden auf http://localhost:4200/api geleitet

            const dupReq = req.clone({ url: newUrl });
            return next.handle(dupReq);
        }

        return next.handle(req);
    }
}

export function rewriteConnectionsUrl(url: string): string {
    if (url.startsWith(getConfig().connectionsUrl.toString())) {
        var newUrl = new URL(url);
        newUrl.protocol = "http"
        newUrl.port = "4200"
        newUrl.host = "localhost"
        newUrl.pathname = "api" + newUrl.pathname

        return newUrl.toString();
    }
    return url;
}