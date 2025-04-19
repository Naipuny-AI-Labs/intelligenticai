/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IAgent } from '../../Interface'

@Entity()
export class Agent implements IAgent {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    category!: string

    @Column('text', { array: true, nullable: true })
    tags!: string[]

    @Column()
    pricing!: string

    @Column({ default: false })
    featured!: boolean

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    createdDate!: Date

    @Column({ type: 'timestamp' })
    @UpdateDateColumn()
    updatedDate!: Date
}
