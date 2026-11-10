import { Injectable } from '@nestjs/common';
import { HelloClient } from '../hello/hello.client';

@Injectable()
export class GreetingService {
  constructor(private readonly helloClient: HelloClient) {}

  greet(name: string) {
    return this.helloClient.sayHello(name);
  }
}
