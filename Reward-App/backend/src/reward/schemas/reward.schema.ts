import * as mongoose from 'mongoose';

export const RewardSchema = new mongoose.Schema({
  id: Number,
  customerId: String,
  amount: Number,
  purchaseDate: String,
  reward: Number,
});
