import { Gender, ROLES } from 'interfaces'


export const ACTIVE_CONST = [
  {
    value: 0,
    text: 'Inactive',
    color: 'red',
  },
  {
    value: 1,
    text: 'Active',
    color: 'green',
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
