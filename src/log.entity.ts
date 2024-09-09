import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public signature: string

    @Column()
    public data: string
}