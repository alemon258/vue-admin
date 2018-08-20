<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100% "
        :default-sort = "{prop: 'date', order: 'descending'}"
        @sort-change="handleSort"
        >
        <el-table-column
        prop="date"
        label="出生年月"
        sortable='custom'
        width="180"
        >
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        sortable='custom'
        width="150">
        </el-table-column>
        <el-table-column
        prop="sex"
        label="性别"
        width="100">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址"
        :formatter="formatter">
        </el-table-column>
        <el-table-column 
        label="操作"
        fixed="right"
        width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row, scope.column, scope.store)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio  :label="1">男</el-radio>
						<el-radio  :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="出生年月">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.date"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false; editLoading=false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script>
  var jsdata = [{
          date: '2016-05-02',
          name: '张小虎',
          sex: '男',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          sex: '男',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '黄小虎',
          sex: '男',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          sex: '女',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
  export default {
    created() {
      this.$emit('showHeader', this.tabName)
    },
    data() {
      return {
        tabName: 'Tab',
        tableData: jsdata,
        editLoading: false,
        editFormVisible: false,
        editId:'',
        editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
        editForm: {
          name: '',
          sex: '',
          date: '',
          address: ''
        }
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      
      //编辑
      handleEdit(index, row) {
        this.editFormVisible = true
        let para= Object.assign({}, row);
        para.sex = para.sex == '男' ? 1 : para.sex == '女' ? 0 : -1
        this.editForm = para
        this.editId = index
      },

      //删除
      handleDelete(index) {
        this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					//this.listLoading = true;
					//NProgress.start();
					this.removeUser(index).then(() => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						})
					})
				}).catch(() => {
				})
      },

      //编辑提交
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
             // para.date = (!para.date || para.date == '') ? '' : util.formatDate.format(new Date(para.date), 'yyyy-MM-dd');
            //时间格式化
            function formatDateTime(inputTime) {  
                var date = new Date(inputTime);
                var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                // var minute = date.getMinutes();
                // var second = date.getSeconds();
                // minute = minute < 10 ? ('0' + minute) : minute;  
                // second = second < 10 ? ('0' + second) : second; 
                return y + '-' + m + '-' + d;  
            }
            para.date = formatDateTime(para.date)

              para.sex = para.sex == 1 ? '男' : para.sex == 0 ? '女' : '未知'
             
							this.editUser(this.editId, para).then(() => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								//this.getUsers();
							});
						});
					}
				});
      },

        //编辑数据api
        editUser(index, para) {
          return new Promise(function(reslove, reject) {
            //实时更新数据
            Object.assign(jsdata[index], para) 
            reslove()
          }
        )},

        //删除数据api
        removeUser(index) {
          return new Promise(function (reslove, reject) {
            jsdata.splice(index, 1)
            reslove()
          })
        },

      //获取用户列表
      //  getUsers(){
        
      //   console.log(this.tableData)
      //  },

      //外部排序
      handleSort(column) {
        //倒序排序
        if(column.order == "descending") {
            let compare = function (prop) {
              return function(obj1, obj2){
                let val1 = obj1[prop]
                let val2 = obj2[prop]
                //哪一列排序
                if(prop == 'date') {
                  val1 = val1.replace(/-/g, '')
                  val2 = val2.replace(/-/g, '')
                  return Number(val2) - Number(val1)
                } else if(prop == 'name'){
                  return val2.localeCompare(val1, 'zh')
                }
              }
              }
                jsdata.sort(compare(column.prop))
              }
              //正序排序 
              else if(column.order == 'ascending'){         
                  let compare = function (prop) {
                  return function(obj1, obj2){
                  let val1 = obj1[prop]
                  let val2 = obj2[prop]
                  if (prop == 'date'){
                    val1 = val1.replace(/-/g, '')
                    val2 = val2.replace(/-/g, '')
                    return Number(val1) - Number(val2)
                  } else if(prop == 'name'){
                    return val1.localeCompare(val2, 'zh')
                    }
                  }
                }
                jsdata.sort(compare(column.prop))
              }
              
              }
        }
  }
  </script>