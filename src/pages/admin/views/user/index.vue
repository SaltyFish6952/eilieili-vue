<template>
    <div>
        <h1>用户管理</h1>
        <el-divider/>
        <el-input class="search" placeholder="请输入内容" v-model="search" clearable>
            <template slot="prepend">筛选</template>
        </el-input>

        <el-table
                v-loading="loading"
                :data="tables"
                tooltip-effect="dark"
                style="width: 100%"
                header-align="center">
            <el-table-column width="50" header-align="center" align="center">
                <template slot-scope="{row,$index}">
                    <span>{{$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户id" min-width="50" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.userId)"></span>
                </template>
            </el-table-column>
            <el-table-column label="用户名" min-width="50" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.userName)"></span>
                </template>
            </el-table-column>
            <el-table-column label="用户账号" min-width="50" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.userAccount)"></span>
                </template>
            </el-table-column>
            <el-table-column label="用户密码" min-width="200" header-align="center" align="center">
                <template slot-scope="{row}">
                    <span v-html="searchValue(row.userPassword)"></span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100"
                    header-align="center">
                <template slot-scope="{row,$index}">

                    <el-button type="text" size="small" @click.native="handleEdit($index, row)">
                        编辑
                    </el-button>
                    <el-popconfirm style="margin-left: 10px;"
                                   @onConfirm="handleDelete($index, row)" title="确定要删除吗？">
                        <el-button slot="reference" type="text" size="small">删除
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog
                @close="handleClosing"
                title="编辑用户信息"
                :visible.sync="active"
                width="40%"
                center>

            <el-form
                    style="margin: 0 20px;"
                    :model="editUser"
                    ref="form"
                    :rules="rules">

                <el-form-item label="用户名" prop="userName">
                    <el-input clearable type="text" maxlength="20" show-word-limit v-model="editUser.userName">

                    </el-input>
                </el-form-item>


                <el-form-item label="用户账号" prop="userAccount">
                    <el-input clearable type="text" maxlength="20" show-word-limit v-model="editUser.userAccount">

                    </el-input>
                </el-form-item>

                <el-form-item label="用户密码" prop="userPassword">
                    <el-input clearable type="password" maxlength="50" show-word-limit v-model="editUser.userPassword">

                    </el-input>
                </el-form-item>


                <!--                <el-form-item label="所属专区" prop="sectorId">-->

                <!--                    <el-select v-model="changeForm.sectorId" placeholder="请选择">-->
                <!--                        <el-option-->
                <!--                                v-for="item in sectors"-->
                <!--                                :key="item.sectorId"-->
                <!--                                :label="item.sectorName"-->
                <!--                                :value="item.sectorId">-->
                <!--                        </el-option>-->
                <!--                    </el-select>-->

                <!--                </el-form-item>-->
            </el-form>


            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="handleEditSubmit(editUser)">提交</el-button>

                                <el-button @click="active = false">取消</el-button>
                            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {deleteUser as deleteUserApi, getAllUsers as getAllUsersApi, updateUser as updateUserApi} from "@/api/user";
    import {throwError} from "@/utils/error";
    import {Encrypt} from "@/utils/crypto";

    export default {
        name: "index",
        data() {
            return {
                tableData: [],

                loading: true,
                search: '',
                editUser: {},
                active: false,
                rules: {
                    userName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 5, message: '长度在5个字符以上', trigger: 'blur'}
                    ],
                    userAccount: [
                        {required: true, message: '请输入用户账号', trigger: 'blur'},
                        {min: 5, message: '长度在5个字符以上', trigger: 'blur'}
                    ],
                    userPassword: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'},
                        {min: 5, message: '长度在5个字符以上', trigger: 'blur'}
                    ]
                }

            }
        },
        computed: {
            tables: function () {
                const search = this.search
                if (search) {
                    return this.tableData.filter(dataNews => {
                        return Object.keys(dataNews).some(key => {
                            if (key === 'userId' || key === 'userName' || key === 'userAccount' || key === 'userPassword')
                                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }

        }
        ,
        methods: {
            // eslint-disable-next-line no-unused-vars
            handleEditSubmit(item) {
                updateUserApi({
                    userId: item.userId,
                    userName: item.userName,
                    userAccount: item.userAccount,
                    userPassword: Encrypt(item.userPassword)
                }).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success("用户编辑成功")
                            setTimeout(function () {
                                location.reload()
                            }, 500)

                        } else {
                            throwError("用户编辑失败", response, this)
                        }

                        this.active = false

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            handleClosing() {
                this.editUser = {}
            },
            // eslint-disable-next-line no-unused-vars
            handleEdit(index, row) {

                this.editUser = JSON.parse(JSON.stringify(row))
                this.active = true

                //
                // this.temps[index] = JSON.stringify(row)
                //
                // this.showEdit[index] = true;
                // this.showBtn[index] = true;
                // this.$set(this.showEdit, index, true)
                // this.$set(this.showBtn, index, true)
            }
            ,
            //点击删除
            // eslint-disable-next-line no-unused-vars
            handleDelete($index, row) {
                window.console.log($index, row)

                deleteUserApi({userId: row.userId}).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success("用户删除成功")
                            setTimeout(function () {
                                location.reload()
                            }, 500)

                        } else {
                            throwError("用户删除失败", response, this)
                        }

                        this.active = false

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })

            },


            getAllUsers() {
                getAllUsersApi().then(response => {
                    try {
                        const {users} = response.data;
                        this.tableData = users
                        this.loading = false

                    } catch (e) {
                        throwError(e, response, this)
                    }
                })
            }
            ,
            searchValue(val) {
                val = val + '';
                if (val.indexOf(this.search) !== -1 && this.search !== '') {
                    return val.replace(this.search, '<font color="#409EFF"><b>' + this.search + '</b></font>')
                } else {
                    return val
                }
            }

        }
        ,
        created() {
            this.getAllUsers();
        }
    }
</script>

<style scoped>
    .search {
        margin: 5px 20px;
        float: right;
        width: 300px;
    }

    .edit-cell {
        width: 90%;
    }
</style>