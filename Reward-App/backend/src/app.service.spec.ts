import { Test, TestingModule } from '@nestjs/testing';
import {AppService} from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('AppService - should be defined', () => {
    expect(service).toBeDefined();
  });

  it('AppService - should be defined', () => {
    expect(service.root()).toEqual('Hello World!');
  });
});
