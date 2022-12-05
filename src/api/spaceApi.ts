import { ApiResponse, ListParams, ListResponse, Space, SpaceDetail } from 'interfaces'
import axiosClient from './axiosClient'

const spaceApi = {
  async getAll(params: ListParams): Promise<ListResponse<Space>> {
    const data: ApiResponse<Space> = await axiosClient.get('/spaces/overview', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },
  async getAllForDashboard(params: ListParams): Promise<ListResponse<Space>> {
    const data: ApiResponse<Space> = await axiosClient.get('/spaces/overview?approved=false&&notApproved=false', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },
  async getAllDetail(params: ListParams): Promise<ListResponse<Space>> {
    const data: ApiResponse<Space> = await axiosClient.get('/spaces', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<SpaceDetail> {
    const url = `/spaces/${id}`
    return axiosClient.get(url)
  },

  add(data: Space): Promise<Space> {
    const url = '/spaces'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: Space): Promise<Space> {
    const url = `/spaces/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<Space> {
    const url = `/spaces/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },

  approveSpace(data: { approved: boolean; userId: string | null }, spaceId: number): Promise<Space> {
    const url = `/spaces/approve/${spaceId}/${data.userId}/${data.approved}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },
  hideSpace(data: {status: boolean; userId: string | null }, spaceId: number): Promise<Space> {
    const url = `/spaces/hide/${spaceId}/${data.userId}/${!data.status}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  async getCountries(): Promise<string[]> {

    return await axiosClient.get('/spaces/countries')
  },

  async getProvinces(): Promise<string[]> {

    return await axiosClient.get('/spaces/provinces')
  },

  async getDistricts(): Promise<string[]> {

    return await axiosClient.get('/spaces/districts')
  },
}
export default spaceApi
