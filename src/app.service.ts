import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): string {
    return '<h1 style="text-align:center; margin-top:100px">Nest API</h1>';
  }
}
