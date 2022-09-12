import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Put,
  Query,
  Delete,
  Req,
} from '@nestjs/common';
import { CustomerPurchase } from './dto/CustomerPurchase.dto';
import { RewardService } from './reward.service';

@Controller('')
export class RewardController {
  constructor(private rewardService: RewardService) {
  }

  @Get('rewards')
  async getRewards(
    @Res() res,
    @Query('start') start,
    @Query('end') end,
  ) {
    const post = await this.rewardService.getRewardsPerCustomer(start, end);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Get('rewards/total')
  async getRewardTotal(
    @Res() res,
    @Query('start') start,
    @Query('end') end,
  ) {
    const post = await this.rewardService.getTotalRewards(start, end);
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Get('purchase/:customerId')
  async getRewardBypostID(
    @Res() res,
    @Param('customerId') customerId,
    @Query('start') start,
    @Query('end') end,
  ) {
    const post = await this.rewardService.getPurchaseByCustomerId(
      customerId,
      start,
      end,
    );
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Get('/purchase')
  async getAll(@Res() res) {
    const post = await this.rewardService.findAllPurchases();
    if (!post) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(post);
  }

  @Post('/purchase')
  async savePurachse(@Res() res, @Body() createPostDTO: CustomerPurchase[]) {
    const newPost = await this.rewardService.savePuchases(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }
}
