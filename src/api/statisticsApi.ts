import { ReportParams } from 'interfaces'
import axiosClient from './axiosClient'

const reportApi = {
  getRevenue(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/revenue', { params })
  },

  getTotalSpaces(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/space/count', { params })
  },

  getTotalBookings(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/booking', { params })
  },

  getTotalCustomer(params?: ReportParams): Promise<number> {
    return axiosClient.get('/customers/count', { params })
  },

  getTopSpace(params?: ReportParams): Promise<any[]> {
    return axiosClient.get('/statistics/space', { params })
  },

  getCategoriesStatistics(year?: string): Promise<any[]> {
    return axiosClient.get('/statistics/categories/data', { params: year })
  },
}

export default reportApi
