/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IOnBoardUser } from '../../Interface'

@Entity()
export class OnBoardUser implements IOnBoardUser {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    usecase!: string

    @Column()
    companysize!: string

    @Column()
    industry!: string

    @Column()
    companyname!: string

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    designation!: string

    @Column()
    phone!: string

    @Column({ type: 'text' })
    requirements!: string

    @Column({ nullable: true })
    dataprivacy?: boolean

    @Column({ nullable: true })
    marketingconsent?: boolean

    @Column()
    status!: string

    @Column({ type: 'timestamp' })
    @CreateDateColumn()
    createdDate!: Date

    @Column({ type: 'timestamp' })
    @UpdateDateColumn()
    updatedDate!: Date
}
