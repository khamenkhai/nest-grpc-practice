import { Observable } from 'rxjs';

export interface HelloReply {
  message: string;
}

export interface HelloServiceClient {
  sayHello(request: { name: string }): Observable<HelloReply>;
}
