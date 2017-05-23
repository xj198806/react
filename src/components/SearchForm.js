import React from 'react'
import { Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;



class SearchForm extends React.Component {

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      this.props.transferSearch(values.label,values.name,values.profile);
    });
  }

  handleReset = () => {
    console.log("reset");
    this.props.form.resetFields();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    const { getFieldDecorator,getFieldProps } = this.props.form;
    const {label,name,profile} = this.props;
    // To generate mock Form.Item
    const children = [];
    children.push(
    <Col span={6} key={0}>
      <FormItem {...formItemLayout} label={`label`}>
          <Input placeholder="placeholder"  {...getFieldProps('label',{initialValue: label})} />
      </FormItem>
    </Col>
    );
    children.push(
      <Col span={6} key={1}>
        <FormItem {...formItemLayout} label={`name`}>
            <Input placeholder="placeholder" {...getFieldProps('name',{initialValue: name})} />
        </FormItem>
      </Col>
    );
    children.push(
      <Col span={6} key={2}>
        <FormItem {...formItemLayout} label={`profile`}>
            <Input placeholder="placeholder" {...getFieldProps('profile',{initialValue: profile})} />
        </FormItem>
      </Col>
    );

    return (

      <div>
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {children}
          <Col span={6} >
            <Button type="primary" htmlType="submit">Search</Button>
            &nbsp;&nbsp;&nbsp;
            <Button offset={1} onClick={() => this.handleReset()}>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
      </div>
    );
  }
}

SearchForm = Form.create()(SearchForm)

export default SearchForm