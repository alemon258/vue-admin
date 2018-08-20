<template>
    <div style="height:100vh">

        <el-container>
                <el-header  style="text-align: right; font-size: 14px; background-color: #12afe3; line-height: 60px;">
                        <div style="display: flex">
                            <div style="width: 260px; text-align: center">
                                <span><img src="/static/logo.png" class="logo">
                                </span>
                            </div>
                            <div style="width: calc(100% - 260px); padding-left: 20px;">
                            <el-dropdown trigger="click">                   
                                <el-button class="elbu">
                                {{ username }}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>用户信息</el-dropdown-item>
                                    <el-dropdown-item>修改密码</el-dropdown-item>
                                    <el-dropdown-item @click.native="logout">退出帐号</el-dropdown-item>                                
                            </el-dropdown-menu>
                        </el-dropdown> 
                        </div>
                        </div >  
                </el-header>
            </el-container>  

            <el-container style="height: calc(100% - 60px);">
                             
                <el-aside style=" background-color: white;">
                    <el-menu
                    :default-active= this.$route.path
                    :router= true               
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">Form</template>
                            <el-menu-item index="/admin/vue1_1">Tab</el-menu-item>
                            <el-menu-item index="/admin/vue1_2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="/admin/vue1_3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1_4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="/admin/vue1_4_1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="/admin/vue2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/vue3">
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/vue4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                    </el-menu>
                </el-aside>
 
                <el-main style="color: grey; background-color: rgb(215, 221, 228);">
                    <div class="page-header" v-if="!showmain">
                        <h1 style="margin: 0px; padding: 25px">{{headername}}</h1>
                    </div>
                    <component :is="mainView" @showHeader='showHeader'></component>
                    <template v-if="showmain">
                            <div style="text-align: center"><h1>欢迎来到后台管理系统</h1></div>
                        </template>
                </el-main>
            </el-container>    
       
        
    </div>
</template>

<script>
import Vue1_1 from '../components/1-1'
import Vue1_2 from '../components/1-2'
import Vue1_3 from '../components/1-3'
import Vue1_4_1 from '../components/1-4-1'
import Vue2 from '../components/2'
import Vue3 from '../components/3'
import Vue4 from '../components/4'


export default {
    data () {
        return {
            headername: '',
            username: 'admin',
            mainView: this.$route.path.split('/')[2],
            showmain: '',
        }
    },

    created (){
        if (this.$route.path.split('/').length == 2) {
            this.showmain = true
        }
    },

    watch: {
        $route: { handler (to, from) {
            var arr = to.path.split('/')
            if (arr[arr.length - 1] != 'admin') {
                this.change()
            }
            else {
                this.mainView = ""
                this.showmain = true
            }
        }
        },            
        },

    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
            console.log(this.$route.path)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        change () {
            this.mainView = this.$route.path.split('/')[2]
            this.showmain = false
        },
        logout (){
            this.$router.push('/')
        },
        showHeader(name) {
            this.headername = name
        }
    },

    components: {
        Vue1_1,
        Vue1_2,
        Vue1_3,
        Vue1_4_1,
        Vue2,
        Vue3,
        Vue4
    }
}
</script>

<style>
    .page-header {
        background-color: #fff;
        margin: -15px -15px 15px;
        height: 85px;
        text-align: left;
    }

    .logo {
        text-align: left;
        height: 50px;
        width: 50px;
    }

    .elbu {
        background-color: #12afe3;
        border: 0px;
        padding: 0 10px;
        height: 60px;
        cursor: pointer;
        color: white;
    }

    .elbu:hover{
        background-color: rgba(0, 0, 0,.05);
        color: white;
    }
    .elbu:focus {
        display: none;
    }

    .el-main {
        padding: 15px;
    }
</style>
