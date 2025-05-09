export interface IAgent {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  capabilities: string[];
  useCases: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  technicalSpecs: {
    responseTime: string;
    concurrentUsers: string;
    security: string;
    apiAccess: string;
  };
  documentation: {
    gettingStarted: {
      title: string;
      description: string;
      url: string;
    };
    apiReference: {
      title: string;
      description: string;
      url: string;
    };
    tutorials: {
      title: string;
      description: string;
      url: string;
    };
  };
  examples: Array<{
    title: string;
    description: string;
    userQuery: string;
    agentResponse: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
  }>;
  relatedAgents: string[];
  pricing: {
    amount: number;
    currency: string;
    interval: string;
    features: string[];
  };
  metadata: {
    featured: boolean;
    popular: boolean;
    new: boolean;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  };
  media: {
    thumbnail: string;
    banner: string;
    logo: string;
    screenshots: Array<{
      url: string;
      alt: string;
      caption: string;
    }>;
    video: {
      url: string;
      thumbnail: string;
      duration: number;
    };
  };
  integration: {
    apiEndpoint: string;
    sdkSupport: string[];
    webhooks: boolean;
    oauth: boolean;
  };
  requirements: {
    dataFormats: string[];
    minDataSize: string;
    maxDataSize: string;
    supportedPlatforms: string[];
  };
}
export interface IChatflow {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  capabilities: string[];
  useCases: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  technicalSpecs: {
    responseTime: string;
    concurrentUsers: string;
    security: string;
    apiAccess: string;
  };
  documentation: {
    gettingStarted: {
      title: string;
      description: string;
      url: string;
    };
    apiReference: {
      title: string;
      description: string;
      url: string;
    };
    tutorials: {
      title: string;
      description: string;
      url: string;
    };
  };
  examples: Array<{
    title: string;
    description: string;
    userQuery: string;
    agentResponse: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
  }>;
  relatedFlows: string[];
  pricing: {
    amount: number;
    currency: string;
    interval: string;
    features: string[];
  };
  metadata: {
    featured: boolean;
    popular: boolean;
    new: boolean;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
  };
  media: {
    thumbnail: string;
    banner: string;
    logo: string;
    screenshots: Array<{
      url: string;
      alt: string;
      caption: string;
    }>;
    video: {
      url: string;
      thumbnail: string;
      duration: number;
    };
  };
  integration: {
    apiEndpoint: string;
    sdkSupport: string[];
    webhooks: boolean;
    oauth: boolean;
  };
  requirements: {
    dataFormats: string[];
    minDataSize: string;
    maxDataSize: string;
    supportedPlatforms: string[];
  };
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
