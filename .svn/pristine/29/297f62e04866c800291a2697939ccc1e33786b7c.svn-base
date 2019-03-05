<template>
      <el-row>
          <el-col :span='24'>
            <div class="navigationbar"> 
               <span class="navigationname">在线考试管理<i class="el-icon-arrow-right" aria-hidden="true"></i>
                     考场管理
                </span>
            </div>
          </el-col>
         <el-col :span='24'>
             <el-form :inline="true" :model="testform" class="demo-form-inline"  size='mini'>
                <el-form-item >
                    <el-input v-model="testform.roomName" placeholder="考场名称"></el-input>
                </el-form-item>
                <el-form-item >
                        <el-button type="primary" icon='el-icon-search' >查询</el-button>        
                </el-form-item>
                <el-form-item style="margin-left:80px;">
                      <el-button type="primary"  icon='el-icon-plus' @click="addtestroom" >考场增加</el-button>    
                </el-form-item>
             </el-form>
         </el-col>
         <el-col :span='24'>
                 <el-table
                    :data="testtableData"
                    border
                    size='mini'
                    style="width: 100%">
                    <el-table-column
                        prop="roomName"
                        label="考场名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="roomDesc"
                        label="考场描述"
                       >
                    </el-table-column>           
                    <el-table-column
                        prop="startTime"
                        label="开始时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="结束时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作"
                        width="120">
                          <el-button type='primary' size="mini" >编辑</el-button>
                          <el-button type='danger'  size="mini" >删除</el-button>
                    </el-table-column>
             </el-table>
         </el-col>
    

      </el-row>
</template>

<script>

import{examinationroomlist}from'@/api/api'
    export default {
          data(){
              return{
                 currentPage:1,
                 pageSize:10,
                  testform:{
                         roomName:'',
                  },
                  testtableData:[],
              }
          },
          methods:{
              addtestroom(){//增加考场
                  this.$router.push('/TestRoomdeail')
              },
              getexamtionroonlist(){
                       var parms={
                               currentPage:this.currentPage,
                               pageSize:this.pageSize,
                               roomName:this.testform.roomName
                        }
                     examinationroomlist(parms).then(res=>{
                               console.log(res)
                               if(res.data.code==0){
                                     this.testtableData=res.data.data.list
                               }
                     })    
              },
          },
          mounted(){
                 this.getexamtionroonlist() 
          }
    }
</script>

<style    lang="scss"  scoped>

</style>