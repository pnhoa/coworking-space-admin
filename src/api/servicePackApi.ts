import { ServicePack, ListParams } from 'interfaces'
import axiosClient from './axiosClient'

const servicePackApi = {
  getAll(params?: ListParams): Promise<ServicePack[]> {
    const url = '/servicePacks'
    return axiosClient.get(url, { params })
  },

  getById(id: number): Promise<ServicePack> {
    const url = `/servicePacks/${id}`
    return axiosClient.get(url)
  },

  add(data: ServicePack): Promise<ServicePack> {
    const url = '/servicePacks'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: ServicePack): Promise<ServicePack> {
    const url = `/servicePacks/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<ServicePack> {
    const url = `/servicePacks/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}
export default servicePackApi
