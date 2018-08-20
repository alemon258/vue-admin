<template>
    <div class="bg">
        <div class="center">
            <div><h2 style="font-family: 'Microsoft YaHei'; text-align: center; color: #0084ff">后台管理</h2></div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="login">
                <el-form-item label="用户名" prop="username" class="eitem">
                    <el-input v-model="ruleForm.username" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" class="eitem" @keydown.enter.native="submitForm('ruleForm')">
                    <el-input type="password" v-model="ruleForm.password" placeholder=""></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-form-item style="text-align:center;" label-width="0px">
                    <el-button type="primary" style="width:300px" @click="submitForm('ruleForm')" >登录</el-button>   
                </el-form-item>
                </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        var validatepass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'))
            } else {
                callback()
            }
        }

        return {
            ruleForm: {
                username: 'admin',
                password: '123456',
            },

            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    { validator: validatepass, trigger: 'blur' }
                ]
            },

            checked: true
        }
    },

    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.username == 'admin' && this.ruleForm.password == '123456') {
                        this.$router.push('/admin')
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 2000
                        })
                        } else {
                                this.$alert('用户名或密码错误', '警告', {
                                    confirmButtonText: '确定',
                                    // callback: action => { 
                                    //     this.$message({
                                    //         type: 'info',
                                    //         message: `action: ${action}`
                                        //})
                                    // }                       
                            })
                        }
                    
                } else {                        
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
    .eitem {
        margin-right: 20px;
    }

    .login {
        margin-top: 50px;
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 400px;
        margin: -200px -175px;
        width: 350px;
        background-color: white;
    }
    .bg {
        height: 100vh;
        background-image: url('/static/bg.png');
        background-size: cover; 
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
    }
    .remember {
      margin: 0px 0px 22px 25px;
    }
</style>
