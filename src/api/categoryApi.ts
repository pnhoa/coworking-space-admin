import { Category, ListParams } from 'interfaces'
import axiosClient from './axiosClient'

const categoryApi = {
  getAll(params?: ListParams): Promise<Category[]> {
    const url = '/categories'
    return axiosClient.get(url, { params })
  },

  getById(id: number): Promise<Category> {
    const url = `/categories/${id}`
    return axiosClient.get(url)
  },

  remove(id: string): Promise<Category> {
    const url = `/categories/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },

  async add(data: Category) {
    const formData = new FormData()
    if(data.thumbnail != null && data.thumbnail.startsWith('blob') ) {
      let blob = await fetch(data.thumbnail).then(r => r.blob());
      const myFile = new File([blob], "image." + (blob.type).replace("image/", ""), {
        type: blob.type,
      });
      formData.append("file", myFile)
    }
    data.thumbnail = undefined
    formData.append('theCategoryDto',
      new Blob([JSON.stringify(data)], { 
        type: 'application/json'
      }));

    return formData;
    
  },

  async update(data: Category)  {
    const formData = new FormData()
    if(data.thumbnail != null && data.thumbnail.startsWith('blob') ) {
      let blob = await fetch(data.thumbnail).then(r => r.blob());
      const myFile = new File([blob], "image." + (blob.type).replace("image/", ""), {
        type: blob.type,
      });
      formData.append("file", myFile)
    }
    data.thumbnail = undefined
    formData.append('theCategoryDto',
      new Blob([JSON.stringify(data)], { 
        type: 'application/json'
      }));

    return formData;
  },
}
export default categoryApi
