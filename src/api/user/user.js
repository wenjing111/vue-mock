// 引入axios封装
import requset from '@/api/request'

// 注册
function getUserList(arg) {
  return requset({
    url: '/user/list',
    method: 'get',
    arg
  })
}

// 新增
function addNewUser(arg) {
  return requset({
    url: '/user/save',
    method: 'post',
    arg
  })
}

// 删除
function delUser(arg) {
  return requset({
    url: '/user/del',
    method: 'get',
    arg
  })
}

// 更新
function updateUser(arg) {
  return requset({
    url: '/user/update',
    method: 'post',
    arg
  })
}

// 注册
function sigin(arg) {
  return requset({
    url: '/user/sigin',
    method: 'post',
    arg
  })
}

// 登录
function login(arg) {
  return requset({
    url: '/user/login',
    method: 'post',
    arg
  })
}

export default {
  getUserList,
  addNewUser,
  delUser,
  updateUser,
  sigin,
  login
}