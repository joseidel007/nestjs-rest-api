import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [{
    id: uuid(),
    name: 'Toyota',
    createAt: new Date().getTime()
  },
  {
    id: uuid(),
    name: 'Jeep',
    createAt: new Date().getTime()
  },
  {
    id: uuid(),
    name: 'Honda',
    createAt: new Date().getTime()
  }

]



  create(createBrandDto: CreateBrandDto) {
    const newBrand = {
      id: uuid(),
      ...createBrandDto,
      createAt: new Date().getTime()
    }

    this.brands.push(newBrand);

    return newBrand
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( (brand) => brand.id === id )
    
    if(!brand) throw new NotFoundException(`Brand with id '${id}' not found`)
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDB = this.findOne(id);

    this.brands = this.brands.map( brand =>{

      if(brand.id === id){ 
        brandDB = {...brandDB,... updateBrandDto, id };
        return brandDB;
      }
      return brand;
    })
    return brandDB;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter( brand => brand.id !== id )
    return brand;
  }
}
