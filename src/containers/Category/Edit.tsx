import { Form, notification, Spin } from 'antd'
import categoryApi from 'api/categoryApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { Category, DrawerCustomProps } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import CategoryForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditCategoryModal: FC<Props> = ({
  refetch,
  id,
  resource,
  title = 'EDIT CATEGORY',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const category: Category = resource?.find((item: Category) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      name: category?.name,
      description: category?.description,
    })
  }, [form, category])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: category?.id,
        }
        const formData = await categoryApi.update(formValues)
        await fetch(`https://top-coworking-spcace.herokuapp.com/api/categories/${category?.id}`, {
        method: 'put',
        body: formData,
        headers: {
                  "Authorization":  `Bearer ${localStorage.getItem('token')}`
                  },
      
      })
      .then( (response) =>  response.json() )
        .then((data) => {
          if(data.status === 'BAD_REQUEST') {
            setLoading(false)
            notification.error({
              message: data.message,
              duration: 2
            });
          } else {
            notification.success({
              message: 'Update category successfully!',
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
    <div>
      <DrawerCustom
        title={title}
        onClose={closeModal}
        visible={visible}
        onOk={onOk}
        okButtonProps={{ loading: loading }}
      >
        <Form form={form} layout='vertical'>
          <FormContextCustom.Provider value={{ form, record: category }}>
            {isEmpty(category) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <CategoryForm />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditCategoryModal
