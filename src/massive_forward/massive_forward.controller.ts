import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MassiveForwardService } from './massive_forward.service';
import { Create_Massive_Forward } from './dto/massive_forward.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('massive-forward')
export class MassiveForwardController {
  constructor(private readonly massiveForwardService: MassiveForwardService) {
  }
  @UseGuards(JwtAuthGuard)
  @Get('getGroups/:instanceName')
  async getgroups(@Param('instanceName') instanceName : string){
    return await this.massiveForwardService.getGrups(instanceName);
  }
  @UseGuards(JwtAuthGuard)
  @Post('createConfig')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagen'))
  async createGroup(@Body() createConfig: Create_Massive_Forward , @UploadedFile() imagen : Express.Multer.File){
    await this.massiveForwardService.createConfig(createConfig , imagen);
  }
}
