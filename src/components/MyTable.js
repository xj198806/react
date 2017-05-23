import React from 'react'
import {Table, Form, Row, Col, Input, Button, Icon, message } from 'antd';
const FormItem = Form.Item;

import SearchForm from './SearchForm.js'
import ConfigModel from './ConfigModel.js'
// import ConfigFormModel from './ConfigForm.js'


const host = "http://localhost:9090/"

class MyTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tDate: [],
            selectedRowKeys: [],
            label: "master",
            name: "application",
            profile: "dev"
        }
    }

    transferSearch = (label, name, profile) => {
        const url = host+name+"/"+profile+"/"+label
        this.fetchByUrl(url);
    }

    fetchData = () => {
        const {label,name,profile} = this.state
        const url = host+name+"/"+profile+"/"+label
        this.fetchByUrl(url);
    }

    fetchByUrl = (url) =>{
        const configs = []
        fetch(url)//,{ method: 'GET',cache: 'no-store'})
        .then((res) => {
            //console.log(res.status);
            return res.json() })
        .then((data) => {
            if (data.propertySources && data.propertySources.length > 0){
                data.propertySources.forEach(source =>{
                    for (var key of Object.keys(source.source)) {
                      configs.push({"key":key,"value":source.source[key]})
                    }
                })
            }
            this.setState({
                tDate: configs,
                name: data.name,
                label: data.label,
                profile: data.profiles[0]
            })
        })
        .catch((e) => { console.log(e.message) })
    }

    handleData(configKey,configValue) {
        const {label,name,profile} = this.state
        fetch(host + name+"/" + profile+"/" + label, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "configKey="+configKey+"&configValue="+configValue
        })
        //.then((res) => { console.log(res.status);return res.json() })
        .then((res) => {
          if (res.ok) {
            message.success('操作成功!');
            this.fetchData();
          } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
          }
        })
        .catch((e) => { alert("Error submitting form!");})
    }

    deleteConfig = (record) =>{
        const {label,name,profile} = this.state
        fetch(host + name+"/" + profile+"/" + label+"/" + record.key, {
          method: "DELETE"
        })
        //.then((res) => { console.log(res.status);return res.json() })
        .then((res) => {
          if (res.ok) {
            message.success('操作成功!');
            this.fetchData();
          } else if (res.status == 401) {
            alert("Oops! You are not authorized.");
          }
        })
        .catch((e) => { alert("Error submitting form!");})
    }


    componentDidMount() {
        this.fetchData();
    }
    /*
    componentWillUpdate(){
        this.fetchData();
    }*/

    // checkbox状态
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    edit(index) {
        const { tDate } = this.state;
        console.log(tDate[index]);
        console.log(tDate[index]["key"]);
        console.log(tDate[index]["value"]);
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
        const { selectedRowKeys,label,name,profile } = this.state;
        //const fetchDataFun = this.fetchData();
        //console.log("render---"+profile);
        const columns = [{
            title: '配置项',
            width: '30%',
            dataIndex: 'key'
        }, {
            title: '配置值',
            width: '50%',
            dataIndex: 'value',
        }, {
            title: '操作',
            width: '20%',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const configKey = record.key;
                const configValue = record.value;
                //console.log(configKey+"--"+configValue);
                return (<div>
                <ConfigModel title="修改" configKey={configKey} configValue={configValue}
                handleData = {(key,value) => this.handleData(key,value)} />

                <Button type="ghost" onClick={() => this.deleteConfig(record)}>
                  删除
                </Button>
                </div>)
                //return <a onClick={() => this.edit(index)}>编辑</a>
            }
        }]

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        const pagination = {
            total: this.state.tDate.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
            },
            onChange(current) {
                console.log('Current: ', current)
            }
        }

        return (
            <div>
                <SearchForm name={name} profile={profile} label={label}
                transferSearch = {this.transferSearch} />
                <ConfigModel title="新增"
                handleData = {(key,value) => this.handleData(key,value)} />
                <Table rowSelection={rowSelection} columns={columns} style={{ marginTop: 24 }}
                    dataSource={this.state.tDate} bordered pagination={pagination} />

            </div>
        )
    }
}

export default MyTable
