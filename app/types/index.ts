export interface HeroImage {
  title: string
  description: string
  url: string
}

export interface DemoVideo {
  title: string
  contentType: string
  fileName: string
  description: string
  url: string
}

export interface BodyContent {
  json: any
  links?: {
    assets?: {
      block?: Asset[]
    }
  }
}

export interface Asset {
  sys: {
    id: string
  }
  url: string
  description: string
}

export interface Project {
  slug: string
  title: string
  description: string
  heroImage: HeroImage
  techTags: string[]
  date?: string
}

export interface ProjectExtended extends Project {
  externalUrl?: string
  bodyContent?: BodyContent
  demoVideo?: DemoVideo
}
