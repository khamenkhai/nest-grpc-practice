import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloService } from './hello.service';

@Controller()
export class HelloGrpcController {
  constructor(private readonly helloService: HelloService) {}

  @GrpcMethod('HelloService', 'SayHello')
  sayHello(data: { name: string }) {
    console.log(`📨 [HELLO SERVICE] gRPC request received for: ${data.name}`);

    const response = this.helloService.sayHello(data.name);

    console.log(`📤 [HELLO SERVICE] Sending gRPC response: ${response.message}`);
    return response;
  }
}
