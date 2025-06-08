import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  // This is a custom provider
  // This is also optional, meaning it can be injected if available
  // If not provided, the service will still work without it
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
