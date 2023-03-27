import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<CreateClientDto>,
  ){}


  async create(createClientDto: CreateClientDto) {
    try{
      const client = this.clientRepository.create(createClientDto);
      await this.clientRepository.save(client)
      return client;

    }
    catch(error){
      console.log(error)
      throw new InternalServerErrorException('Ayuda')

    }
  }

  findAll(paginationDto: PaginationDto) {
    const {limit = 10, offset = 0} = paginationDto;
    return this.clientRepository.find({
      take: limit,
      skip: offset
    });
  } 

  async findOne(id: string) {
    const client = await this.clientRepository.findOneBy({ id });
    if(!client) 
    throw new NotFoundException(`Client with id ${id} not found`)
    return client
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto
    })

    if(!client) throw new NotFoundException(`Client with id: ${ id } not found`)
    return this.clientRepository.save( client );
  }

  async remove(id: string) {
    const client = await this.findOne(id);  
    await this.clientRepository.remove( client )
  }
}
