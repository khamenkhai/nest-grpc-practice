import { HelloService } from './hello.service';

describe('HelloService', () => {
  it('creates a friendly message', () => {
    expect(new HelloService().sayHello('Junior')).toEqual({
      message: 'Hello, Junior! 👋',
    });
  });
});
