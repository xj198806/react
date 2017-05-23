import React from 'react'
import { Table, Input, Popconfirm } from 'antd';

const host = "http://localhost:9090/"
const label = "master"
const name = "application"
const profile = "dev"

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value.toString() || ' '}
            </div>
        }
      </div>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
      const configs = []

      /* 获取数据
      let myHeaders = new Headers({
          'Access-Control-Allow-Origin': '*'
      });*/
      fetch(host+name+"/"+profile+"/"+label)//,{ method: 'GET',mode: 'cors',headers: myHeaders,cache: 'default'})
          .then((res) => { console.log(res.status);return res.json() })
          .then((data) => {
              if (data.propertySources && data.propertySources.length > 0){
                  data.propertySources.forEach(source =>{
                      for (var key of Object.keys(source.source)) {
                        configs.push({"key":key,"editable":false,"value":source.source[key]})
                      }
                  })
              }
              console.log("ajax")
              this.setState({
                  data: configs
              })
          })
          .catch((e) => { console.log(e.message) })

  }

  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  render() {
    const columns = [{
         title: 'key',
         dataIndex: 'key',
         width: '30%',
         render: (text, record, index) => this.renderColumns(this.state.data, index, 'key', text),
       }, {
         title: 'value',
         dataIndex: 'value',
         width: '50%',
         render: (text, record, index) => this.renderColumns(this.state.data, index, 'value', text),
       },  {
         title: 'operation',
         dataIndex: 'operation',
         render: (text, record, index) => {
           const editable = this.state.data[index].editable;
           return (
             <div className="editable-row-operations">
               {
                 editable ?
                   <span>
                     <a onClick={() => this.editDone(index, 'save')}>Save</a>
                     <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                       <a>Cancel</a>
                     </Popconfirm>
                   </span>
                   :
                   <span>
                     <a onClick={() => this.edit(index)}>Edit</a>
                   </span>
               }
             </div>
           );
         },
    }]
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    return <Table bordered dataSource={dataSource} columns={columns} />;
  }
}
