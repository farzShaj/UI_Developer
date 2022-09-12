import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reward } from './interface/reward.interface';
import { CustomerPurchase } from './dto/CustomerPurchase.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<Reward>,
  ) {
  }

  async getRewardsPerCustomer(start, end) {
    let start_date = new Date(start);
    let end_date = new Date(end);
    end_date.setDate(end_date.getDate() + 1);
    const data = await this.rewardModel.find({
      purchaseDate: {
        $gte: start_date,
        $lt: end_date,
      },
    });
    return data;
  }

  async getPurchaseByCustomerId(customerId, start, end) {
    let start_date = new Date(start);
    let end_date = new Date(end);
    end_date.setDate(end_date.getDate() + 1);
    const data = await this.rewardModel.find({
      customerId: customerId,
      purchaseDate: {
        $gte: start_date,
        $lt: end_date,
      },
    });
    return data;
  }

  async findAllPurchases() {
    const data = await this.rewardModel.find({});
    return data;
  }

  async getTotalRewards(start, end) {
     let start_date = new Date(start);
     let end_date = new Date(end);

     end_date.setDate(end_date.getDate() + 1);
    const data = await this.rewardModel.find({
      purchaseDate: {
        $gte: start_date,
        $lt: end_date,
      },
    });
    let total = 0;
    if(data){
      const result = JSON.parse(JSON.stringify(data));
      result.forEach((e)=>{
        total = total + e.reward;
      })
    }
    return total;
  }

  public savePuchases(customerPurchaseDtos: CustomerPurchase[]) {
    customerPurchaseDtos.forEach(e => {
      this.savePuchase(e);
    });
  }

  public savePuchase(customerPurchaseDto: CustomerPurchase) {
    customerPurchaseDto.reward = this.calculateRewards(
      customerPurchaseDto.amount,
    );
    customerPurchaseDto.purchaseDate = new Date(customerPurchaseDto.purchaseDate)
    const model = this.rewardModel(customerPurchaseDto);
    model.save();
  }

  private calculateRewards(amount: number) {
    let reward = 0;
    if (amount <= 50) {
      return reward;
    } else if (amount > 50 && amount <= 100) {
      reward += amount - 50;
    } else if (amount > 100) {
      reward += 50;
      reward += (amount - 100) * 2;
    }
    return reward;
  }
}
