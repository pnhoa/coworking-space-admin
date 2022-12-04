import { notification } from 'antd'
import { ApiResponse, Employee, ListParams, ListResponse } from 'interfaces'
import axiosClient from './axiosClient'

const employeeApi = {
  async getAll(params: ListParams): Promise<ListResponse<Employee>> {
    const data: ApiResponse<Employee> = await axiosClient.get('/employees', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Employee> {
    const url = `/employees/${id}`
    return axiosClient.get(url)
  },

  remove(id: string): Promise<Employee> {
    const url = `/employees/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },

  async update(data: Employee)  {
    const formData = new FormData()
    if(data.profilePicture != null && data.profilePicture.startsWith('blob') ) {
      let blob = await fetch(data.profilePicture).then(r => r.blob());
      const myFile = new File([blob], "image." + (blob.type).replace("image/", ""), {
        type: blob.type,
      });
      formData.append("file", myFile)
    }
    data.profilePicture = undefined
    formData.append('theEmployeeDto',
      new Blob([JSON.stringify(data)], { 
        type: 'application/json'
      }));

     await fetch(`https://top-coworking-spcace.herokuapp.com/api/employees/${data.id}`, {
      method: 'put',
      body: formData,
      headers: {
                "Authorization":  `Bearer ${localStorage.getItem('token')}`
                },
    
    }).then(function (response) {
      notification.info({ message: "Update employee successfully!" })
    })
    .catch(function (response) {
      notification.error({ message: response.message })
    });
  },

  async add(data: Employee) {
    const formData = new FormData()
    if(data.profilePicture != null && data.profilePicture.startsWith('blob') ) {
      let blob = await fetch(data.profilePicture).then(r => r.blob());
      const myFile = new File([blob], "image." + (blob.type).replace("image/", ""), {
        type: blob.type,
      });
      formData.append("file", myFile)
    }
    data.profilePicture = undefined
    formData.append('theEmployeeDto',
      new Blob([JSON.stringify(data)], { 
        type: 'application/json'
    }));

    return formData;
  },

  active(userId: number): Promise<Employee> {
    const url = `/employees/active/${userId}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, token)
  },
}
export default employeeApi
