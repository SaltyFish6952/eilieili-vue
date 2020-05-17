<template>
    <div>
        <h1>分区管理</h1>
        <el-divider/>
        <div>
            <el-button @click="handleNewSector" v-if="isShowNewSector !== true" class="newSectorBtn" type="primary">
                新增分区
            </el-button>
            <div class="block" v-if="isShowNewSector===true">
                <el-input
                        class="sectorInput"
                        type="text"
                        placeholder="新区名（无需输入‘区’字）"
                        maxlength="5"
                        show-word-limit
                        v-model="newSectorName">
                    <template slot="append">区</template>
                </el-input>
                <el-button @click="handleSubmit" class="sectorClickSubmit" type="primary">确定</el-button>
                <el-button @click="handleCancelNewSector" class="sectorClickCancel" type="danger">取消</el-button>


            </div>
            <el-input class="search" placeholder="请输入内容" v-model="search" clearable>
                <template slot="prepend">筛选</template>
            </el-input>
        </div>

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
            <el-table-column label="分区id" min-width="50" header-align="center" align="center">

                <template slot-scope="{row}">
                    <span v-html="searchValue(row.sectorId)"></span>
                </template>

            </el-table-column>
            <el-table-column label="分区名称" min-width="50" header-align="center" align="center">
                <template slot-scope="{row,$index}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.sectorName">
                    <span v-if="!showEdit[$index]" v-html="searchValue(row.sectorName)"></span>
                </template>
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="100"
                    header-align="center"
                    align="center">
                <template slot-scope="{row,$index}">
                    <el-button type="text" size="small" @click.native="handleUpdate($index, row)"
                               v-if="showBtn[$index]">更新
                    </el-button>
                    <el-button type="text" size="small" @click.native="handleCancel($index, row)"
                               v-if="showBtn[$index]">取消
                    </el-button>

                    <el-button type="text" size="small" @click.native="handleEdit($index, row)" v-if="!showBtn[$index]">
                        编辑
                    </el-button>

                    <el-popconfirm style="margin-left: 10px;" v-if="!showBtn[$index]" @onConfirm="handleDelete($index, row)" title="确定要删除吗？">
                        <el-button slot="reference" type="text" size="small">删除
                        </el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {deleteSector, getSector as getSectorApi, postSector, updateSector} from "@/api/sector";
    import {throwError} from "@/utils/error";

    export default {
        name: "index",
        data() {
            return {
                newSectorName: '',
                isShowNewSector: false,
                tableData: [],
                showEdit: [], //显示编辑框
                showBtn: [],
                showBtnOrdinary: true,
                loading: true,
                search: '',
                temps: []
            }
        },
        computed: {
            tables: function () {
                const search = this.search
                if (search) {
                    return this.tableData.filter(dataNews => {
                        return Object.keys(dataNews).some(key => {
                            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.tableData
            }

        },
        methods: {
            handleNewSector() {
                this.isShowNewSector = true
            },
            handleCancelNewSector() {
                this.isShowNewSector = false
            },
            handleSubmit() {

                if (this.newSectorName !== '') {
                    postSector({sectorName: this.newSectorName + '区'}).then(response => {

                        try {

                            if (response.code === 0) {
                                this.$message.success("新增分区成功！")
                                setTimeout(function () {
                                    location.reload()
                                }, 500)
                            } else {
                                throwError("新增分区失败", response, this)
                            }

                        } catch (e) {
                            throwError(e, response, this)
                        }

                    })
                }


            },// eslint-disable-next-line no-unused-vars
            handleEdit(index, row) {

                this.temps[index] = JSON.stringify(row)

                this.showEdit[index] = true;
                this.showBtn[index] = true;
                this.$set(this.showEdit, index, true)
                this.$set(this.showBtn, index, true)
            }
            ,
            //取消编辑
            // eslint-disable-next-line no-unused-vars
            handleCancel(index, row) {

                const temp = JSON.parse(this.temps[index])

                for (const param in temp) {
                    row[param] = temp[param]
                }

                this.$set(this.showEdit, index, false)
                this.$set(this.showBtn, index, false)
            }
            ,

            //点击更新
            // eslint-disable-next-line no-unused-vars
            handleUpdate($index, row) {
                window.console.log($index, row)

                updateSector({sectorId: row.sectorId, sectorName: row.sectorName}).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success("更新分区成功！")
                            setTimeout(function () {
                                location.reload()
                            }, 500)
                        } else {
                            throwError("更新分区失败", response, this)
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            }
            ,
            //点击删除
            // eslint-disable-next-line no-unused-vars
            handleDelete($index, row) {
                window.console.log($index, row)

                deleteSector({sectorId: row.sectorId}).then(response => {

                    try {

                        if (response.code === 0) {
                            this.$message.success("删除分区成功！")
                            setTimeout(function () {
                                location.reload()
                            }, 500)
                        } else {
                            throwError("删除分区失败", response, this)
                        }

                    } catch (e) {
                        throwError(e, response, this)
                    }

                })
            },
            searchValue(val) {
                val = val + '';
                if (val.indexOf(this.search) !== -1 && this.search !== '') {
                    return val.replace(this.search, '<font color="#409EFF"><b>' + this.search + '</b></font>')
                } else {
                    return val
                }
            },
            getSectors() {
                getSectorApi().then(response => {
                    try {
                        const {sectors} = response.data;
                        this.tableData = sectors
                        this.loading = false

                    } catch (e) {
                        throwError(e, response, this)
                    }
                })
            }

        },
        mounted() {
            this.getSectors()
        }
    }
</script>

<style scoped>
    .newSectorBtn, .block, .sectorClickCancel, .sectorClickSubmit, .sectorInput {
        float: left;
    }

    .sectorInput {
        width: 300px;
        margin: 0 20px;
    }

    .block {
        margin: 0 20px;
        width: 600px;
    }

    .newSectorBtn {
        margin: 5px 20px;
    }

    .search {
        margin: 5px 20px;
        float: right;
        width: 300px;
    }
</style>