import React from 'react'
import { Form, Input, Modal, Button } from 'antd';
const FormItem = Form.Item;

class ConfigModel extends React.Component {
  state = {
    loading: false,
    visible: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  // 提交表单
  handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
            this.setState({ visible: false });
            this.props.handleData(values.configKey,values.configValue);
        }
      });
      this.props.form.resetFields()
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
    const config_key = this.props.configKey ? this.props.configKey.toString() : "";
    const config_value = this.props.configValue ? this.props.configValue.toString() : "";
    const disable = config_key ? true : false;
    const style = config_key ? { float:'left', display:'inline-block' } : {};

    return (

      <div style = {style} >
        <Button type="primary" onClick={this.showModal}>
          {this.props.title}
        </Button>
        <Modal
          visible={this.state.visible}
          title={this.props.title}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleSubmit}>
              <FormItem
                  id="control-input"
                  label="配置项"
                  required>
                  <Input disabled={disable}  placeholder="Please enter..." {...getFieldProps('configKey',{initialValue: config_key})} />
              </FormItem>

              <FormItem
                  id="control-input"
                  label="配置值"
                  required>
                  <Input defaultValue="ddd" placeholder="Please enter..." {...getFieldProps('configValue',{initialValue: config_value})} />
              </FormItem>


              <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>
              <Button key="submit" htmlType="submit" type="primary" size="large" loading={this.state.loading}>
                Submit
              </Button>

          </Form>
        </Modal>
      </div>
    );
  }
}

ConfigModel.propTypes = {
  configKey: React.PropTypes.string,
  configValue: React.PropTypes.string,
  name: React.PropTypes.string,
  profile: React.PropTypes.string,
  label: React.PropTypes.string,
};

ConfigModel = Form.create()(ConfigModel)

export default ConfigModel