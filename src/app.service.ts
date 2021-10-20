import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle.interface';

@Injectable()
export class AppService {
  private vehicles = [
    {
      id: 1,
      type: 'car',
      brand: 'Lambo',
      model: 'Aventator',
      color: 'Yellow',
      year: 2010,
    },
    {
      id: 2,
      type: 'bike',
      brand: 'BMW',
      model: 'Two wheels',
      color: 'Red',
      year: 2020,
    },
    {
      id: 3,
      type: 'car',
      brand: 'Ferrari',
      model: 'X',
      color: 'Blue',
      year: 2010,
    },
  ];
  private nextId = 4;

  getHello(): string {
    return 'Hello World!';
  }

  getVehicles(): Vehicle[] {
    return this.vehicles;
  }

  getVehiclesByType(type: string): Vehicle[] {
    return this.vehicles.filter((vehicle: Vehicle) => {
      return vehicle.type === type;
    });
  }

  getVehiclesByTypeAndId(type: string, id: number): Vehicle {
    const vehiclesFiltered = this.getVehiclesByType(type);
    const foundVehicle = vehiclesFiltered.find((vehicle: Vehicle) => {
      return Number(vehicle.id) === Number(id);
    });
    return foundVehicle;
  }

  createVehicleByType(
    type: string,
    vehicleData: Omit<Vehicle, 'id' | 'type'>,
  ): Vehicle {
    const newVehicle = {
      id: this.nextId,
      type,
      ...vehicleData,
    };

    this.vehicles.push(newVehicle);
    this.nextId++;

    return newVehicle;
  }
}
