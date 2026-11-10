import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GreetingService } from './greeting.service';

@ApiTags('Greetings')
@Controller('greetings')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get(':name')
  @ApiOperation({ summary: 'Call hello-service over gRPC' })
  @ApiParam({ name: 'name', example: 'Junior' })
  greet(@Param('name') name: string) {
    console.log(`🌐 [GREETING SERVICE] REST request received for: ${name}`);
    return this.greetingService.greet(name);
  }
}
