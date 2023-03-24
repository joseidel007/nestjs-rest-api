import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interface/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create.car.dto';
import { UpdateCarDto } from './dto/update.car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id} ' not found `);
    return car;
  }

  create(createCarDto: CreateCarDto ){
    const newCar = {
      id: uuid(),
      ...createCarDto,
    }

    this.cars.push(newCar);
    return newCar
  }

  update(id: string, updateCarDto: UpdateCarDto){
    let carDB = this.findById( id );

    this.cars = this.cars.map( car =>{
      if(car.id === id){
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }

      return car
    })

    return carDB;
  }

  delete(id: string){
    let car = this.findById(id);
    this.cars = this.cars.filter( car => car.id !== id);
    return car
  }

}
