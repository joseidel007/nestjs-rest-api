import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brans: Brand[] = [{
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

    this.brans.push(newBrand);

    return newBrand
  }

  findAll() {
    return this.brans;
  }

  findOne(id: string) {
    const brand = this.brans.find( (brand) => brand.id === id )
    
    if(!brand) throw new NotFoundException(`Brand with id '${id}' not found`)
    return brand;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
