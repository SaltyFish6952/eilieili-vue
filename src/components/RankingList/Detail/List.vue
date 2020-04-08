<template>
    <el-table
            :data="rankingList"
            style="width: 100%">
        <el-table-column
                type="index"/>
        <el-table-column>

            <template slot-scope="scope">
                <ListItem :scope="scope"/>
            </template>

        </el-table-column>
    </el-table>
</template>

<script>
    import ListItem from "@/components/RankingList/Detail/ListItem";

    export default {
        name: "DetailList",
        components: {ListItem},
        props: {
            rankingList: Array
        }
    }
</script>

<style scoped>

</style>