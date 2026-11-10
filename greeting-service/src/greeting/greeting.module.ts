import { Module } from '@nestjs/common';
import { HelloClientModule } from '../hello/hello-client.module';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';

@Module({
  imports: [HelloClientModule],
  controllers: [GreetingController],
  providers: [GreetingService],
})
export class GreetingModule {}
