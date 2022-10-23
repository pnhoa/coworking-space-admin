import { ApiResponse, Booking, ListParams, ListResponse } from 'interfaces'
import axiosClient from './axiosClient'

const bookingApi = {
  async getAll(params: ListParams): Promise<ListResponse<Booking>> {
    const data: ApiResponse<Booking> = await axiosClient.get('/bookings', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Booking> {
    const url = `/bookings/${id}`
    return axiosClient.get(url)
  },

  updateStatus(data: { status: string; userId: string | null }, bookingId: number): Promise<Booking> {
    const url = `/bookings/status/${bookingId}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },
}

export default bookingApi
