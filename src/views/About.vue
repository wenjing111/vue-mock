<template>
	<div class="about">
		<h1 @click="addNewUser">This is an about page</h1>
		<button @click="delUser">删除</button>
		<button @click="updateUser">更新用户</button>
		<button @click="sigin">注册</button>
		<button @click="login">登录</button>
	</div>
</template>

<script>
	import userApi from '@/api/user/user.js'
export default {
	data() {
		return {
			
		}
	},
	methods: {
		getUserList() {
			userApi.getUserList({start:1,limit:20}).then(res=>{
				console.log(res)
			})
		},
		addNewUser(){
			let data = {
				id:1,
				name: 'zs',
				desc: '他的名字叫张三',
				age:20,
				sex:1
			}
			userApi.addNewUser(data).then(res=>{
				console.log(res);
				this.getUserList();
			})
		},
		delUser(){
			userApi.delUser({id:1}).then(res=>{
				console.log(res);
				this.getUserList();
			})
		},
		updateUser(){
			userApi.updateUser({id:1,name:'张攀宇',desc:'这是一个女生',age:21,sex:1}).then(res=>{
				console.log(res);
				this.getUserList();
			})
		},
		sigin(){
			userApi.sigin({username:'zpy',password:123456}).then(res=>{
				console.log(res);
			})
		},
		login(){
			userApi.login({username:'zpy',password:123456}).then(res=>{
				console.log(res);
			})
		}
	},
	created() {
		this.getUserList();
	}
};
</script>
