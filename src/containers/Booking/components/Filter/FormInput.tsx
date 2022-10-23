import { Form, Input, Tooltip } from 'antd'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { FC, useContext } from 'react'

const FormInput: FC = () => {
  const { allowPressEnter, handleSubmit } = useContext(FormContextCustom)

  return (
    <Tooltip title='content'>
      <Form.Item name='content'>
        <Input
          placeholder='Content'
          onPressEnter={allowPressEnter ? handleSubmit : undefined}
        />
      </Form.Item>
    </Tooltip>
  )
}

export default FormInput
