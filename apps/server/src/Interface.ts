export interface IAgent {
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    pricing: string
    featured: boolean
    updatedDate: Date
    createdDate: Date
}

export interface IUser {
    id: string
    usecase: string
    industry: string
    companysize: string
    companyname: string
    name: string
    email: string
    designation: string
    phone: string
    requirements: string
    updatedDate: Date
    createdDate: Date
    dataprivacy?: boolean
    marketingconsent?: boolean
    username: string
    password: string
    apikey: string
}

export interface IOnBoardUser {
    id: string
    usecase: string
    industry: string
    companysize: string
    companyname: string
    name: string
    email: string
    designation: string
    phone: string
    requirements: string
    updatedDate: Date
    createdDate: Date
    dataprivacy?: boolean
    marketingconsent?: boolean
}
