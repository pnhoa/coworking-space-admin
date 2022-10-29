import { Form, Input,Col, Row, Select } from 'antd'
import FormUploadImage from 'components/common/FormUploadImage'
import { Gender, ROLES } from 'interfaces'
import { FC } from 'react'

interface Props {
  isEdit?: boolean
  isAdmin?: boolean
}

const { Option } = Select
const { TextArea } = Input

const EditProfileForm : FC<Props> = ({ isEdit, isAdmin }) => {
  return (
    <Row gutter={32}>
      <Col span={12}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input disabled={isEdit} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='phoneNumber'
          label='Phone Number'
          rules={[{ required: true, message: 'Please input your phone number' }]}
        >
          <Input disabled={isEdit} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='userName'
          label='Username'
          rules={[{ required: true, message: 'Please input your username' }]}
        >
          <Input disabled={isEdit} />
        </Form.Item>
      </Col>

      {!isEdit && (
        <>
          <Col span={12}>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name='confirm'
              label='Confirm Password'
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!')
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </>
      )}

      <Col span={12}>
        <Form.Item
          name='gender'
          label='Gender'
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder='select your gender'>
            <Option value={Gender.MALE}>Male</Option>
            <Option value={Gender.FEMALE}>Female</Option>
            <Option value={Gender.OTHERS}>Others</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name='roleCode'
          label='Role'
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select placeholder='select your role' disabled={!isAdmin}>
            <Option value={ROLES.ADMIN}>Admin</Option>
            <Option value={ROLES.EMPLOYEE}>Employee</Option>
          </Select>
           
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name='address' label='Address'>
          <TextArea rows={5} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <FormUploadImage name='profilePicture' label='Avatar' />
      </Col>
    </Row>
  )
}

export default EditProfileForm
