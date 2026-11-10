import { HelloClient } from '../hello/hello.client';
import { GreetingService } from './greeting.service';

describe('GreetingService', () => {
  it('calls hello-service', async () => {
    const sayHello = jest.fn().mockResolvedValue({ message: 'Hello, Junior! 👋' });
    const helloClient = { sayHello } as unknown as HelloClient;
    const service = new GreetingService(helloClient);

    await expect(service.greet('Junior')).resolves.toEqual({
      message: 'Hello, Junior! 👋',
    });
    expect(sayHello).toHaveBeenCalledWith('Junior');
  });
});
