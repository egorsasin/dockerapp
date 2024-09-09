import { Controller, Get, Post, Headers, Req, Res, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Response } from 'express';

import { AppService } from './app.service';
import { Log } from './log.entity';

export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post('paynow')
  public async webhook(
    @Headers('Signature') signature: string | undefined,
    @Req() request: RequestWithRawBody,
    @Res() response: Response,
  ): Promise<void> {

    let data = ''
    try {
      data = JSON.stringify(request.body);
    } catch (e) {
      data = request.body.toString();
    }
    
    await this.dataSource.getRepository(Log).save({ signature, data });

    response.status(HttpStatus.OK).send('OK');
  }
}
