<template>
    <div>

        <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                header-align="center">
            <el-table-column width="50" header-align="center">
                <template slot-scope="{row,$index}">
                    <span>{{$index + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户id" prop="Name" min-width="100" header-align="center">
                <template slot-scope="{row,$index}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.userId">
                    <span v-if="!showEdit[$index]">{{row.userId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户名" prop="Name" min-width="100" header-align="center">
                <template slot-scope="{row,$index}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.userName">
                    <span v-if="!showEdit[$index]">{{row.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户账号" prop="Name" min-width="100" header-align="center">
                <template slot-scope="{row,$index}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.userAccount">
                    <span v-if="!showEdit[$index]">{{row.userAccount}}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户密码" prop="Name" min-width="200" header-align="center">
                <template slot-scope="{row,$index}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.userPassword">
                    <span v-if="!showEdit[$index]">{{row.userPassword}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100"
                    header-align="center">
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
                    <el-button type="text" size="small" @click.native="handleDelete($index, row)"
                               v-if="!showBtn[$index]">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>