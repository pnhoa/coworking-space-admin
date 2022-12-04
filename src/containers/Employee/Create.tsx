import { Form, notification } from 'antd'
import employeeApi from 'api/employeeApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps, Employee } from 'interfaces'
import { omit } from 'lodash'
import { FC, useState } from 'react'
import EmployeeForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const CreateEmployeeModal: FC<Props> = ({
  title = 'CREATE NEW EMPLOYEE',
  refetch,
  visible,
  closeModal,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formatValues = omit(values, ['confirm']) as Employee
        const formData = await employeeApi.add({ ...formatValues })

        
      await fetch(`${process.env.REACT_APP_URL}/employees`, {
        method: 'post',
        body: formData,
        headers: { "Authorization":  `Bearer ${localStorage.getItem('token')}` },
        })
        .then( (response) =>  response.json() )
        .then((data) => {
          if(data.status === 'BAD_REQUEST') {
            setLoading(false)
            notification.error({
              message: data.message,
            });
          } else {
            notification.success({
              message: 'Add employee successfully!',
            });
            setLoading(false)
            closeModal()
            form.resetFields()
            refetch()
            
          }
        })
        .catch(function (response) {
          notification.error({ message: response.message })
        });

      })
      .then(async () => {
      })
      .catch((info) => {
        setLoading(false)
        notification.error({ message: info.message })
      })
  }

  return (
    <DrawerCustom
      title={title}
      onClose={closeModal}
      visible={visible}
      onOk={onOk}
      okButtonProps={{ loading: loading }}
    >
      <Form form={form} layout='vertical'>
        <FormContextCustom.Provider value={{ form }}>
          <EmployeeForm />
        </FormContextCustom.Provider>
      </Form>
    </DrawerCustom>
  )
}

export default CreateEmployeeModal
