import { Form, notification, Spin } from 'antd'
import servicePackApi from 'api/servicePackApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { ServicePack, DrawerCustomProps } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import ServicePackForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditServicePackModal: FC<Props> = ({
  refetch,
  id,
  resource,
  title = 'EDIT PACKAGE',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const servicePack: ServicePack = resource?.find((item: ServicePack) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      name: servicePack?.name,
      price: servicePack?.price,
      period: servicePack?.period,
    })
  }, [form, servicePack])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: servicePack?.id,
        }
        return await servicePackApi.update(formValues)
      })
      .then(async () => {
        setLoading(false)
        closeModal()
        form.resetFields()
        refetch()
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
          <FormContextCustom.Provider value={{ form, record: servicePack }}>
            {isEmpty(servicePack) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <ServicePackForm />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditServicePackModal
