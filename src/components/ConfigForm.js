import React from 'react'
import { Form, Row, Col, Input, Button, Icon } from 'antd';

export default class ConfigFormModel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isInsert: false,
            visible: false
        }
    }

    // 提交表单
    handleSubmit = (e) => {
        e.preventDefault()
        console.log('收到表单值：', this.props.form.getFieldsValue())

        this.props.form.resetFields()
    }

    // 显示弹框
    showModal = () => {
        this.setState({ visible: true })
    }


    // 隐藏弹框
    hideModal = () => {
        this.setState({ visible: false })
    }

    render() {
        const title = this.state.isInsert ? "新增配置" : "修改配置";

        const { getFieldProps } = this.props.form

        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 6 }
        }

        <Modal title="{title}" visible={this.state.visible} onOk={this.hideModal} onCancel={this.hideModal}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    id="control-input"
                    label="配置项"
                    {...formItemLayout}
                    required>
                    <Input placeholder="Please enter..." />
                </FormItem>

                <FormItem
                    id="control-input"
                    label="配置值"
                    {...formItemLayout}
                    required>
                    <Input placeholder="Please enter..." />
                </FormItem>

                <FormItem wrapperCol={{ span: 6, offset: 3 }} style={{ marginTop: 24 }}>
                    <Button type="primary" htmlType="submit" onClick={success}>确定</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button offset={1} onClick={this.hideModal}>取消</Button>
                </FormItem>
            </Form>
        </Modal>
    }
}