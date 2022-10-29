import { Form, notification, Spin } from 'antd'
import ModalCustom from 'components/common/ModalCustom'
import { ModalForwardRefHandle } from 'interfaces/modal'
import React, { useImperativeHandle, useState, useEffect } from 'react'
import FormEditProfile from './FormEditProfile'
import employeeApi from 'api/employeeApi'
import { Employee } from 'interfaces'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router-dom'

const EditProfileModal: React.ForwardRefRenderFunction<ModalForwardRefHandle, unknown> = (
  props,
  ref,
) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [employee, setEmployee] = useState<Employee>()

  const { push } = useHistory()

   useEffect(() => {
    (async () => {
      try {
        const id = Number(localStorage.getItem('id'))
        const data: Employee = await employeeApi.getById(id)
        setEmployee(data)
      } catch (error) {
        console.log('Failed to fetch profile: ', error)
      }
    })()
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      userName: employee?.userName,
      name: employee?.name,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      email: employee?.email,
      gender: employee?.gender,
      roleCode: employee?.roleCode,
    })
  }, [form, employee])

  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
    }),
    []
  )

  const handleClose = () => {
    setVisible(false)
    form.resetFields()
  }

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: employee?.id,
        }
        return await employeeApi.update(formValues)
      })
      .then(async () => {
        setLoading(false)
        handleClose()
        form.resetFields()
        push('/')
      })
      .catch((info) => {
        setLoading(false)
        notification.error({ message: info.message })
      })
  }

  return (
    <ModalCustom
      title='Edit profile'
      onCancel={handleClose}
      visible={visible}
      onOk={onOk}
      okButtonProps={{ loading }}
    >
      <Form form={form} layout='vertical'>
          <FormContextCustom.Provider value={{ form, record: employee }}>
            {isEmpty(employee) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <FormEditProfile isEdit={true} isAdmin={isEmpty(employee) ? false : employee?.roleCode === "ROLE_ADMIN"} />
            )}
          </FormContextCustom.Provider>
        </Form>
    </ModalCustom>
  )
}

export default React.forwardRef(EditProfileModal)
