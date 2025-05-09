export interface OnboardingFormData {
  id: string
  usecase: string
  companysize: string
  industry: string
  companyname: string
  name: string
  email: string
  designation: string
  phone: string
  requirements: string
  dataprivacy: boolean
  marketingconsent: boolean
  createdDate: string
  updatedDate: string
  status: string
  requestType: string
  agentids: string[]
}

export interface Agent {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  category: string
  capabilities: string[]
  useCases: {
    title: string
    description: string
    icon: string
  }[]
  technicalSpecs: {
    techStackSupport: string
    workflowAutomation: string
    documentationFormat: string
    iterativeFeedback: string
  }
  documentation: {
    gettingStarted: {
      title: string
      description: string
      url: string
    }
    apiReference: {
      title: string
      description: string
      url: string
    }
    tutorials: {
      title: string
      description: string
      url: string
    }
  }
  examples: {
    title: string
    description: string
    userQuery: string
    agentResponse: string
  }[]
  testimonials: {
    quote: string
    author: string
    role: string
    company: string
    rating: number
  }[]
  relatedAgents: string[]
  pricing: {
    amount: number
    currency: string
    interval: string
    features: string[]
  }
  metadata: {
    featured: boolean
    popular: boolean
    new: boolean
    rating: number
    reviewCount: number
    createdAt: string
    updatedAt: string
  }
  media: {
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
  integration: {
    apiEndpoint: string
    sdkSupport: string[]
    webhooks: boolean
    oauth: boolean
  }
  requirements: {
    dataFormats: string[]
    minDataSize: string
    maxDataSize: string
    supportedPlatforms: string[]
  }
}
