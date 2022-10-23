export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  BOOKED = 'BOOKED',
  CANCELLED = 'CANCELLED'
}

export interface Booking {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy: string
  modifiedBy?: string
  name: string
  email: string
  companyName?: string
  phoneNumber: string
  numberOfPeople: number
  totalPrice: number
  startDate: Date
  numberTimePerUnit: number
  note?: string
  spaceId: number
  status: Status
  userId: number
  subSpaceId: number
}
