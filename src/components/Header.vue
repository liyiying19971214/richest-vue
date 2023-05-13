<template>
  <div class="m-content">
    <h3>欢迎来到首富的世界</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <div class="maction">
      <el-link href="/blogs">首页</el-link>
      <el-divider direction="vertical"></el-divider>
      <span>
          <el-link type="success" @click="textJwt" :disabled="!hasLogin">测试jwt内容</el-link>
        </span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin">
          <el-link type="primary" href="/login">登陆</el-link>
        </span>
      <span v-show="hasLogin">
          <el-link type="danger" @click="logout">退出</el-link>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){

    return{
      editForm: {
        id: 1,
        title: '12',
        description: '12',
        content: '212'
      },
      hasLogin:false,
      user:{
        username: '请先登录',
        avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      },
      blogs: {},
    }
  },

  methods: {
    logout() {
      const _this = this
      this.$axios.get('http://localhost:8081/richest-demo/logout', {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(() => {
        _this.$store.commit('REMOVE_INFO')//这里是清理掉jwt的内容
        _this.$router.push('/login')
      });
    },

    textJwt() {
      const _this = this
      this.$axios.post('http://localhost:8081/richest-demo/blog/edit', this.editForm,{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(() => {
        _this.$alert('操作成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            console.log(action)
            _this.$router.push("/blogs")
          }
        });
      });
    }


  },
  created() {
    //加载资源缓存
    if(this.$store.state.userInfo.username) {
      this.user.username = this.$store.state.userInfo.username
      this.user.avatar = this.$store.state.userInfo.avatar
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>

</style>