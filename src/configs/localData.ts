import { Gender, ROLES, Status } from 'interfaces'


export const ACTIVE_CONST = [
  {
    value: 0,
    text: 'Inactive',
    color: 'red',
    colorText: '#F75D81',
    backgroundColor: '#ffefff',
  },
  {
    value: 1,
    text: 'Active',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
]

export const ACTIVE_SPACE_CONST = [
  {
    value: false,
    text: 'Inactive',
    color: 'red',
    colorText: '#F75D81',
    backgroundColor: '#ffefff',
  },
  {
    value: true,
    text: 'Active',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
]

export const PAID_SPACE_CONST = [
  {
    value: false,
    text: 'No',
    color: 'red',
    colorText: '#F75D81',
    backgroundColor: '#ffefff',
  },
  {
    value: true,
    text: 'Yes',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
]

export const APPROVED_CONST = [
  {
    value: false,
    text: 'Not approved',
    color: 'red',
    colorText: '#F75D81',
    backgroundColor: '#ffefff',
  },
  {
    value: true,
    text: 'Approved',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
]

export const GENDER_CONST = [
  {
    value: Gender.MALE,
    text: 'Male',
    color: 'blue',
  },
  {
    value: Gender.FEMALE,
    text: 'Female',
    color: 'pink',
  },
  {
    value: Gender.OTHERS,
    text: 'Others',
    color: 'orange',
  },
]

export const ROLES_CONST = [
  {
    value: ROLES.ADMIN,
    text: 'Admin',
    color: 'blue',
  },
  {
    value: ROLES.EMPLOYEE,
    text: 'Employee',
    color: 'cyan',
  },
]


export const BOOKING_STATUS = [
  {
    value: Status.PENDING,
    text: 'Pending',
    color: 'orange',
    colorText: '#fa8c16',
    backgroundColor: '#fff7e6',
  },
  {
    value: Status.BOOKED,
    text: 'Booked',
    color: 'blue',
    colorText: '#1890ff',
    backgroundColor: '#e6f7ff',
  },
  {
    value: Status.COMPLETED,
    text: 'Completed',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
 
  {
    value: Status.CANCELLED,
    text: 'Cancelled',
    color: 'violet',
    colorText: '#665ca7',
    backgroundColor: '#e0e0ff',
  },
]
