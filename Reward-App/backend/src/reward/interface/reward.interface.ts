import { Document } from 'mongoose';

export interface Reward extends Document {
  readonly customerId: string;
  readonly amount: number;
  readonly purchaseDate: string;
  readonly reward: number;
}
