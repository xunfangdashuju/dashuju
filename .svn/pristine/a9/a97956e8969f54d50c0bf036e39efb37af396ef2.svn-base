<template>
    <div class="paagenumber">
            <el-pagination
                      background
                      layout="prev, pager, next, total"
                      :page-size='pageSize'
                      @current-change="pageIndexChange"
                      :total="pagetotal"
                     >
            </el-pagination>
    </div>
</template>

<script>
    export default {
            props:[
                'pageSize',
                'pagetotal',
            ],
            methods:{
                pageIndexChange(index){
                      this.$emit('currentpage',index)
                }
            }
    }
</script>

<style scoped>

</style>