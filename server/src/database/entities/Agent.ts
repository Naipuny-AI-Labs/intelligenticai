/* eslint-disable */
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import { IAgent } from '../../Interface'

@Entity()
export class Agent implements IAgent {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ unique: true })
    slug!: string

    @Column()
    name!: string

    @Column('text')
    description!: string

    @Column('text')
    shortDescription!: string

    @Column()
    category!: string

    @Column('text', { array: true, default: [] })
    capabilities!: string[]

    @Column('jsonb', { nullable: true })
    useCases!: {
        title: string
        description: string
        icon: string
    }[]

    @Column('jsonb', { nullable: true })
    technicalSpecs!: {
        responseTime: string
        concurrentUsers: string
        security: string
        apiAccess: string
    }

    @Column('jsonb', { nullable: true })
    documentation!: {
        gettingStarted: { title: string; description: string; url: string }
        apiReference:  { title: string; description: string; url: string }
        tutorials:     { title: string; description: string; url: string }
    }

    @Column('jsonb', { nullable: true })
    examples!: {
        title: string
        description: string
        userQuery: string
        agentResponse: string
    }[]

    @Column('jsonb', { nullable: true })
    testimonials!: {
        quote: string
        author: string
        role: string
        company: string
        rating: number
    }[]

    @Column('text', { array: true, default: [] })
    relatedAgents!: string[]

    @Column('jsonb', { nullable: true })
    pricing!: {
        amount: number
        currency: string
        interval: string
        features: string[]
    }

    @Column('jsonb', { nullable: true })
    metadata!: {
        featured: boolean
        popular: boolean
        new: boolean
        rating: number
        reviewCount: number
        createdAt: string
        updatedAt: string
    }

    @Column('jsonb', { nullable: true })
    media!: {
        thumbnail: string
        banner: string
        logo: string
        screenshots: {
            url: string
            alt: string
            caption: string
        }[]
        video: {
            url: string
            thumbnail: string
            duration: number
        }
    }

    @Column('jsonb', { nullable: true })
    integration!: {
        apiEndpoint: string
        sdkSupport: string[]
        webhooks: boolean
        oauth: boolean
    }

    @Column('jsonb', { nullable: true })
    requirements!: {
        dataFormats: string[]
        minDataSize: string
        maxDataSize: string
        supportedPlatforms: string[]
    }

    @CreateDateColumn({ type: 'timestamp' })
    createdDate!: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedDate!: Date
}
