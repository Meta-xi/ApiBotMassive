import { Controller, Get, Post, Body, Param, Delete, Res, Patch, ParseIntPipe, UseGuards } from '@nestjs/common';
import { InstanceWhatsappService } from './instance_whatsapp.service';
import { CreateInstanceWhatsappDto } from './dto/create-instance_whatsapp.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('instance-whatsapp')
export class InstanceWhatsappController {
  constructor(private readonly instanceWhatsappService: InstanceWhatsappService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInstanceWhatsappDto: CreateInstanceWhatsappDto) {
    return await this.instanceWhatsappService.create(createInstanceWhatsappDto);
  }
  @Post(':instanceName')
  async updateSatus(@Param('instanceName') instanceName: string , @Res() response: Response){
    try {
      var message = await this.instanceWhatsappService.updateStatus(instanceName);
      return response.status(200).json({
        message: message
      }
      );
    } catch (error) {
      return response.status(404).json({
        message: error
      });
    }
  }
  @Delete(':instanceName')
  async logoutInstance(@Param('instanceName' ) instanceName :string){
    return await this.instanceWhatsappService.logoutInstance(instanceName);
  }
  @Get()
  findAll() {
    return this.instanceWhatsappService.findAll();
  }
  @Patch(':instanceName')
  async connectInstance(@Param('instanceName') instanceName : string){
    return await this.instanceWhatsappService.connectInstance(instanceName);
  }
  @Delete("DeleteInstance/:instanceName")
  async DeleteInstance(@Param('instanceName')instanceName : string){
    return await this.instanceWhatsappService.delete_instance(instanceName);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':idUserTelegram')
  async FindTheName(@Param('idUserTelegram', ParseIntPipe)idUserTelegram : number){
    return await this.instanceWhatsappService.findInstanceByIdUserTelegram(idUserTelegram);
  }
  

}
