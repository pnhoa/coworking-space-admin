import { notification } from 'antd'
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

    await fetch(`https://top-coworking-spcace.herokuapp.com/api/categories`, {
    method: 'post',
    body: formData,
    headers: { "Authorization":  `Bearer ${localStorage.getItem('token')}` },
  
    }).then(function (response) {
      notification.info({ message: "Add category successfully!" })
    })
    .catch(function (response) {
      notification.error({ message: response.message })
    });
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

     await fetch(`https://top-coworking-spcace.herokuapp.com/api/categories/${data.id}`, {
      method: 'put',
      body: formData,
      headers: {
                "Authorization":  `Bearer ${localStorage.getItem('token')}`
                },
    
    }).then(function (response) {
      notification.info({ message: "Update category successfully!" })
    })
    .catch(function (response) {
      notification.error({ message: response.message })
    });
  },
}
export default categoryApi
