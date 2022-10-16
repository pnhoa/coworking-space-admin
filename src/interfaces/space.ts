export interface Space {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  name: string
  shortDescription?: string
  description: string
  price: number
  unit: number
  largeImage?: string
  address?: string
  country?: string
  province?: string
  district?: string
  minPrice: number
  maxPrice: number
  numberOfRoom: number
  acreage: number
  electricPrice: number
  waterPrice: number
  status: boolean
  approved: boolean
  notApproved: boolean
  xCoordinate: number
  yCoordinate: number
  discount: number
  ratingAverage: number
  categoryId: number
  paid: boolean
  expired: boolean
  expiredDate: Date
}

export interface SpaceDetail {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  name: string
  price: number
  unit: number
  largeImage?: string
  minPrice: number
  maxPrice: number
  numberOfRoom: number
  acreage: number
  electricPrice: number
  waterPrice: number
  status: boolean
  approved: boolean
  notApproved: boolean
  paid: boolean
  expired: boolean
  xCoordinate: number
  yCoordinate: number
  discount: number
  ratingAverage: number
  spaceContact: SpaceContact
  spaceDescription: SpaceDescription
  spaceAmenity: SpaceAmenity
  spaceAddress: SpaceAddress
  spaceOperationTimes: SpaceOperationTime[]
  serviceSpaces: ServiceSpace[]
  images: Image[]
  spacePayments: SpacePayment[]
  categoryId: number
  userId: number
  spaceDescriptionId: number
  spaceContactId: number
  spaceAmenityId: number
  spaceAddressId: number
  spaceOperationTimeIds: number[]
}

export interface SpaceContact {
  id: number
  email: string
  phone: string
  websiteUrl: string
  facebookUrl: string
  instagramUrl: string
}

export interface SpaceDescription {
  id: number
  openingDate: Date
  shortDescription: string
  description: string
  spaceAddress: SpaceAddress
}

export interface SpaceAmenity {
  id: number
  internet: boolean
  parking: boolean
  airConditioner: boolean
  heater: boolean
  cableTV: boolean
  tv: boolean
  toilet: boolean
  motel: boolean
  catering: boolean
}

export interface SpaceAddress {
  id: number
  locationName: string
  addressLine1: string
  addressLine2: string
  floorNumber: string
  country: string
  province: string
  district: string
  subDistrict: string
  zipCode: string
}

export interface SpaceOperationTime {
  id: number
  day: string
  openTime: string
  closeTime: string
}

export interface ServiceSpace {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  title: string
  note: string
  packages: Package[]
}

export interface Package {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  type: string
  note: string
  subSpaces: SubSpace[]
}

export interface SubSpace {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  title: string
  price: number
  imageUrl: string
  numberOfPeople: number
  status: boolean
  packageId?: number
  packageType?: string
  package?: Package
}

export interface Image {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  fileName: string
  url: string
}

export interface SpacePayment {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  servicePackName: string
  price: number
  expiredTime: Date
  outOfDate: boolean
}