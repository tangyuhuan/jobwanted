import React,{Component} from 'react'
import { NavBar, TabBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink'
// import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'

function Msg(){
	return <h2>消息列表页面</h2>
}
function User(){
	return <h2>个人中心页面</h2>
}
@connect(
	state=>state,

)
class Dashboard extends Component{
	constructor(props){
		super(props)
		
	}
	render(){
		const user = this.props.user //redux中的用户数据
		//header和footer要显示的四个页面的数据,页面要跳转的链接、显示的文字
		const {pathname} = this.props.location
		const navList = [
			{
				path: '/boss',
				text: '牛人', //boss要看到的是牛人列表
				icon: 'boss',
				title: '牛人列表',
				component:Boss,//所要渲染的组件
				hide: user.type=='genius'//根据user.type来判断此时类型是boss还是genius，是genius，boss看到的列表就需要隐藏
			},
			{
				path: '/genius',
				text: 'boss', //boss要看到的是牛人列表
				icon: 'job',
				title: 'BOSS列表',
				component:Genius,//所要渲染的组件
				hide: user.type=='boss'
			},
			{
				path: '/msg',
				text: '消息', //boss要看到的是牛人列表
				icon: 'msg',
				title: '消息列表',
				component:Msg,//所要渲染的组件
			},
			{
				path: '/me',
				text: '我', //boss要看到的是牛人列表
				icon: 'user',
				title: '个人中心',
				component:User,//所要渲染的组件
			},
		]
		return(
			<div>
				{/*header页面*/}
		    	<NavBar>{navList.find(v=>v.path===pathname).title}</NavBar>
		    	<div style={{marginTop:45}}>
			    	<Switch>
			    		{navList.map(v=>(
			    			<Route key={v.path} path={v.path} component={v.component}></Route>
			    		))}
			    	</Switch>
		    	</div>
		    	<NavLinkBar data={navList} />
		    </div>
		)
	}
}
export default Dashboard
