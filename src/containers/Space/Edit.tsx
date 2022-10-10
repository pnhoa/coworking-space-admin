import { Form, notification, Spin } from 'antd'
import spaceApi from 'api/spaceApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps, Space } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import SpaceForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditSpaceModal: FC<Props> = ({
  refetch,
  id,
  resource,
  extraResource,
  title = 'EDIT SPACE',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const space: Space = resource?.find((item: Space) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      name: space?.name,
      categoryId: space?.categoryId,
      price: space?.price,
      numberOfRoom: space?.numberOfRoom,
      largeImage: "https://www.freeimages.com/photo/windows-1213732",
      unit: space?.unit,
      discount: space?.discount,
    })
  }, [form, space])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: space?.id,
          userId: Number(localStorage.getItem('id')),
          discount: space?.discount,
        }
        return await spaceApi.update(formValues)
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
          <FormContextCustom.Provider value={{ form, record: space }}>
            {isEmpty(space) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <SpaceForm item={space} extraItem={extraResource} />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditSpaceModal
