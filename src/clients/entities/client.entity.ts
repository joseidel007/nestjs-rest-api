import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column('text')
    name: string;

    @Column('text')
    lastName: number;

    @Column('integer')
    age: BigInteger;

    @Column('text',{
        unique: true,
    })
    code: string;


}
