import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Vehicle } from './vehicle.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/vehicles')
  getVehicles(): Vehicle[] {
    return this.appService.getVehicles();
  }

  @Get('/vehicles/:type')
  getVehiclesByType(@Param('type') vehicleType: string): Vehicle[] {
    return this.appService.getVehiclesByType(vehicleType);
  }

  @Get('/vehicles/:type/:id')
  getVehiclesByTypeAndId(
    @Param('type') vehicleType: string,
    @Param('id') vehicleId: string,
  ): Vehicle {
    const vehicle = this.appService.getVehiclesByTypeAndId(
      vehicleType,
      Number(vehicleId),
    );

    if (!vehicle) {
      throw new NotFoundException();
    }

    return vehicle;
  }

  @Post('/vehicles/:type')
  createVehicleByType(
    @Param('type') vehicleType: string,
    @Body() vehicleData: Omit<Vehicle, 'id' | 'type'>,
  ): Vehicle {
    return this.appService.createVehicleByType(vehicleType, vehicleData);
  }
}
