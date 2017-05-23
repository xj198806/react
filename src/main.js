/**
 * 
 * @authors luozh@snail.com
 * @date    2016-03-21 16:42:35
 * @description 主入口模块
 */

import React from 'react'
import { render } from 'react-dom'

// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入Antd的导航组件
import { Menu, Icon, Switch } from 'antd'
const SubMenu = Menu.SubMenu

// 引入Ant-Design样式 & Animate.CSS样式
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

// 引入主体样式文件
import './main.css'

// 引入单个页面（包括嵌套的子页面）
import MyTable from './components/MyTable.js'
import EditableTable from './components/EditableTable.js'
import myForm from './components/form.js'
import myChart from './components/chart.js'
import myAnimate from './components/animate.js'
import myCalendar from './components/calendar.js'
import myCard from './components/fetch.js'

import SearchForm from './components/SearchForm.js'
import NewSearchForm from './components/NewSearchForm.js'

const ACTIVE = { color: 'red' }

// 配置导航
class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',
            username: ''
        }
    }

    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }

    componentDidMount() {
        this.getUser()
    }

    getUser = () => {
        this.setState({
            username: 'x'
        })
    }

    render() {
        return (
            <div>
                <div id="leftMenu"> 
                    <img src='src/assets/images/logo.png' width="50" id="logo"/>
                    <Menu theme="dark"
                        onClick={this.handleClick}
                        style={{ width: 185 }}
                        defaultOpenKeys={['sub1', 'sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航</span></span>}>
                            <Menu.Item key="1"><Link to="/MyTable">配置列表</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/EditableTable">配置列表2</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/myForm">myForm</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/SearchForm">SearchForm</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/NewSearchForm">NewSearchForm</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id="rightWrap">
                    <Menu mode="horizontal">
                        <SubMenu title={<span><Icon type="user" />{ this.state.username }</span>}>
                            <Menu.Item key="setting:1">退出</Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="right-box">
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


// 配置路由
render((
    <Router history={hashHistory} >
        <Route path="/" component={Sider}>
            <IndexRoute path="MyTable" component={MyTable} />
            <Route path="MyTable" component={MyTable} />
            <Route path="EditableTable" component={EditableTable} />
            <Route path="myForm" component={myForm} />
            <Route path="SearchForm" component={SearchForm} />
            <Route path="NewSearchForm" component={NewSearchForm} />
        </Route>
    </Router>
), document.getElementById('app'));


