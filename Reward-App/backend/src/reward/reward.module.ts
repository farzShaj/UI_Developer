import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { RewardSchema } from './schemas/reward.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Reward', schema: RewardSchema }])],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule implements NestModule {

  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
  }
}
