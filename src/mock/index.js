// 引入mock
import Mock from 'mockjs'

// 模拟获取时间
Mock.setup({
	timeout: '200-600'
})

// 生成假数据
const userList = [];

for (let i = 0; i < 30; i++) {
	userList.push(
		Mock.mock({
			id: Mock.Random.guid(),
			name: Mock.Random.cname(),
			desc: Mock.Random.ctitle(),
			'age|10-60': 20,
			sex: Mock.Random.integer(0, 1)
		})
	)
}


// 获取用户列表的处理函数
let getUserList = req => {
	let {
		start,
		limit
	} = getParams(req.url);
	if (!(start && limit)) {
		return {
			status: 0,
			data: userList
		}
	} else {
		let list = userList.filter((el, index) => index < start * limit && index >= start * limit - limit)
		return {
			status: 0,
			data: list
		}
	}
}

// 新增用户
let addNewUser = req => {
	let data = getParams(req.body);
	console.log(data);
	userList.unshift(data);
	return {
		status: 0,
		message: 'S'
	}
}

// 删除用户
let delUser = req => {
	let {
		id
	} = getParams(req.url);
	if (id) {
		let index = userList.findIndex(el => el.id == id);
		userList.splice(index, 1);
		return {
			code: 0,
			message: 'S'
		}
	} else {
		return {
			code: 1,
			message: 'F'
		}
	}
}

// 修改用户
let updateUser = req => {
	let data = getParams(req.body);
	console.log(data);
	let item = userList.find(el => el.id == data.id);
	for (let key in item) {
		item[key] = data[key]
	}
	return {
		code: 0,
		message: 'S'
	}
}

// 获取用户列表 解决无法拦截带参数的get请求问题

Mock.mock(RegExp('/user/list' + ".*"), 'get', getUserList)

// 新增用户列表
Mock.mock(RegExp('/user/save'), 'post', addNewUser)

// 删除用户
Mock.mock(RegExp('/user/del'), 'get', delUser)

// 更新用户
Mock.mock(RegExp('/user/update'), 'post', updateUser)

// ==========>  登录注册

const dataList = [];

// 注册
Mock.mock(RegExp('/user/sigin'), 'post', req => {
	let {
		username,
		password
	} = getParams(req.body);
	let item = {
		id: Mock.Random.guid(),
		username: username,
		password: password
	}
	dataList.push(item);
	return {
		code: 200,
		message: '注册成功'
	}
})

// 登录
Mock.mock(RegExp('/user/login'), 'post', req => {
	let {
		username,
		password
	} = getParams(req.body);
	let bol = dataList.some(el => el.username == username && el.password == password);
	if (bol) {
		return {
			code: 200,
			message: '登录成功'
		}
	} else {
		return {
			code: 500,
			message: '登录失败'
		}
	}

})


// 封装获取mock拦截get请求传来的参数 decodeURI 解析传入的中文
function getParams(url) {
	let s = url.split('?')[1] || url;
	let theRequest = new Object();
	if (s.indexOf("?") == -1) {
		let str = s.split("&");
		for (let i = 0; i < str.length; i++) {
			theRequest[str[i].split("=")[0]] = decodeURI(str[i].split("=")[1]);
		}
	}
	return theRequest;
}
