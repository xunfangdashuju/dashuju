<template>
     <el-row>
      <el-col>
        <div class="navigationbar">
            <span class="navigationname">
                在线考试管理
            <i class="el-icon-arrow-right" aria-hidden="true"></i>
                成绩管理
            </span>
        </div>
      </el-col>
      <el-form  :inline="true"  size="mini">
           <el-form-item   >
                <el-input  v-model="testName" placeholder="请输入考场名称" ></el-input>
           </el-form-item>
           <el-form-item>
                   <el-input  v-model="studentName" placeholder="请输入学生姓名" ></el-input> 
           </el-form-item>
           <el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-search"  >查询</el-button>
           </el-form-item>
      </el-form>
      <el-table  
          size='mini'
         :data="reportcarddata"
         border>
        <el-table-column
            prop="date"
            label="考场名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="试卷名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="状态">
        </el-table-column>
         <el-table-column 
            label="操作">
         </el-table-column>
      </el-table>
     </el-row>
</template>

<script>
    export default {
            data(){
                 return{
                      testName:"",
                      studentName:'',
                      reportcarddata:[],

                 }
            },
            methods:{

            },
            mounted(){
                 
            }
        
    }
</script>

<style  lang='scss'   scoped>

</style>