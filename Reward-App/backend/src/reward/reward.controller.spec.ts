import { Test, TestingModule } from '@nestjs/testing';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { CustomerPurchase } from './dto/CustomerPurchase.dto';

describe('RewardController Unit Tests', () => {
  let rewardController: RewardController;
  let spyService: RewardService;
  const mockRes = {
    status: () => {
      return { json: () => {} };
    },
    json: () => {},
  };
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: RewardService,
      useFactory: () => ({
        getRewardsPerCustomer: jest.fn(() => []),
        getPurchaseByCustomerId: jest.fn(() => []),
        findAllPurchases: jest.fn(() => {}),
        getTotalRewards: jest.fn(() => {}),
        savePuchases: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RewardController],
      providers: [RewardService, ApiServiceProvider],
    }).compile();

    rewardController = app.get<RewardController>(RewardController);
    spyService = app.get<RewardService>(RewardService);
  });

  it('calling getRewards method', async () => {
    await rewardController.getRewards(mockRes, '', '');
    expect(spyService.getRewardsPerCustomer).toHaveBeenCalled();
  });

  it('calling getRewardBypostID method', async () => {
    await rewardController.getRewardBypostID(mockRes, 123, '', '');
    expect(spyService.getPurchaseByCustomerId).toHaveBeenCalled();
  });

  it('calling savePurachse method', async () => {
    const dto = new CustomerPurchase();
    await rewardController.savePurachse(mockRes, []);
    expect(spyService.savePuchases).toHaveBeenCalled();
  });
});
