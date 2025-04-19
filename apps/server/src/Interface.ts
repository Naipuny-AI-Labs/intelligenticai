export interface IAgent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  pricing: string;
  featured: boolean;
  updatedDate: Date;
  createdDate: Date;
}

export interface IUser {
  id: string;
  usecase: string;
  industry: string;
  companysize: string;
  companyname: string;
  name: string;
  email: string;
  designation: string;
  phone: string;
  requirements: string;
  updatedDate: Date;
  createdDate: Date;
  dataprivacy?: boolean;
  marketingconsent?: boolean;
  username: string;
  password: string;
  apikey: string;
}

export interface IOnBoardUser {
  id: string;
  usecase: string;
  industry: string;
  companysize: string;
  companyname: string;
  name: string;
  email: string;
  designation: string;
  phone: string;
  requirements: string;
  updatedDate: Date;
  createdDate: Date;
  dataprivacy?: boolean;
  marketingconsent?: boolean;
}

export interface IRequestAgent {
  id: string;
  userid: string;
  agentid: string;
  usecase: string;
  status: string; // could be 'pending', 'approved', etc. – consider using a union type or enum
  createdDate: Date;
  updatedDate: Date;
  updatedby: string | null;
}
