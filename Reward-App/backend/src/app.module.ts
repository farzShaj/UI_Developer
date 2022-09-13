import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/app-reward', {
      useNewUrlParser: true,
    }),
    RewardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
