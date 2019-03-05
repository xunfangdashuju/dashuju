<template>
  <el-row>
    <el-col :span="24">
        <div  class='Classification'>
                    <div class="deileName" >
                        模块列表
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                        <span>{{courseClassificationshow}}</span>
                        <i class="fa fa-angle-right" aria-hidden="true"></i> 
                        <span>{{contenshow.courseContentName}}</span>  
                    </div>
                     <hr/>
                    <div >
                          <div class="deilimgurl">
                                <img :src=" `${baseUrl}/file/${contenshow.imageUrl}` "  style="width:240px;height:140px;">   
                          </div>
                          <div class="concrnttestName">
                                <div class="nametitle">{{contenshow.courseContentName}}</div>
                                <div class="conctentNamebottom">
                                     <span >共{{experimentCount}}个实验</span>  
                               </div>
                                <div class="conctentNamebottom">
                                     <span >已有{{allCount}}人学过</span>  
                               </div>
                               <div  class="progreddbar">
                                     <span><span class="havelearn">{{meCount}}</span>/{{experimentCount}}</span>
                                  <el-progress :text-inside="true"  :stroke-width="12" :show-text='false' :percentage="percentage" color="rgba(142, 113, 199, 0.7)"></el-progress>
                              </div>    
                          </div>
                    </div>
                    <div>
                          <el-tabs v-model="activeName"  @tab-click="handleClicktab">
                                <el-tab-pane label="全部"  name="first"></el-tab-pane>
                                <el-tab-pane label="已学过" name="second"></el-tab-pane>
                                <el-tab-pane label="未学过" name="third"></el-tab-pane>
                        </el-tabs>
                          <div class="testnumber"     
                                   v-for='(item,index) in testdatashow' 
                                   :key='index'
                                   @mouseover="mouseovertest(index)"
                                   @mouseout="mouseouttest(index)"
                                   :class="select===index ?'movetop':'moveover'"
                                   @click='goindeiletest(item)'
                                   >
                                  <div  style="height:30px;" >
                                        <div style="display:inline-block;width:30px;height:30px;">
                                              <i class="fa fa-eye overread fa-2x" aria-hidden="true" v-if='item.status===1' ></i>    
                                              <i class="fa fa-eye-slash fa-2x" aria-hidden="true"  v-else ></i>  
                                         </div> 
                                        <span style="vertical-align:top;margin-left:10px" >
                                            {{item.resourceManagementName}}
                                        </span>
                                        <span style="display:inline-block;float:right">{{item.count}}人学习过</span>
                                       </div>   
                                        <div v-show="select===index"  class="testDesc">
                                            <span>实验简介:  {{item.resourceManagementDesc}}</span>
                                              <el-button  type="primary" size='mini' style="float:right"  @click.stop='downfile(item.materialUrl)' >下载课件</el-button>
                                         </div> 
                           </div>  
                   </div>
          </div>    
    </el-col>
   </el-row>
</template>
<script>
import{experimentcourseResourcelist}from "@/api/api"
 import {baseUrl} from '../../../static/baseurl'
    export default {
           data(){
               return{
                    activeName:"first",
                    percentage:0,
                    baseUrl,
                    courseClassificationshow:'',
                    contenshow:{},
                    experimentCount:"",//实验总数
                    allCount:'',//总共多少人学,
                    meCount:"",//自己学了几节.
                    testdatashow:[],
                    testdata:[],
                    havelearndata:[],
                    notstudydata:[],
                    select:null,//滑上去的
               }
           },
           methods:{
               getTestlist(){
                    const uid = sessionStorage.getItem('uid')   
                     var parms={
                           studentId:uid,
                           contentId:this.$route.params.id
                     }
                    experimentcourseResourcelist(parms).then(res=>{
                           console.log('--==---实验')
                           console.log(res)
                           if(res.data.code==0){
                                this.courseClassificationshow=res.data.data.courseClassificationName   
                                this.contenshow=res.data.data.content
                                this.experimentCount=res.data.data.experimentCount
                                this.allCount=res.data.data.allCount
                                this.meCount=res.data.data.meCount
                                this.percentage=this.meCount*100/this.experimentCount
                                this.testdata=res.data.data.info
                                this.testdatashow=res.data.data.info

                           } 
                    })
               },
               handleClicktab(tab,name){
                     if(tab.name=='first'){
                            this.testdatashow= this.testdata         
                        }else if(tab.name=='second'){
                            this.havelearndata=[]
                             for(var i=0;i<this.testdata.length;i++){
                                     if(this.testdata[i].status===1){
                                          this.havelearndata.push(this.testdata[i])   
                                     }
                             }  
                                this.testdatashow=this.havelearndata     
                        }else if(tab.name=='third'){
                           this.notstudydata=[];
                          for(var i=0;i<this.testdata.length;i++){
                                     if(this.testdata[i].status===2){
                                          this.notstudydata.push(this.testdata[i])   
                                     }
                             }  
                           this.testdatashow=this.notstudydata
                        }
               },
              mouseovertest(index){//鼠标移上去
                     this.select=index

              },
             mouseouttest(index){//鼠标离开
                     this.select=null;
             },
            downfile(index){
                console.log('下载文件')
                console.log(index)
                if(index==null){
                      this.$message('此实验没有课件')
                }else{
                    window.location.href=`${baseUrl}/file/`+index
                }
              },
              goindeiletest(index){
                  console.log("进去详情")
                  console.log(index)
                 this.$router.push({name:"experimentpage",params:{id:index.resourceManagementId,contentid:index.courseContentId}})  


              },
           },
           mounted(){
                console.log("----")
                console.log(this.$route)
                  this.getTestlist()
           }
    }
</script>

<style  lang="scss"   scoped>
       .deileName{
                font-family: "微软雅黑";
                font-size: 14px;
           }
           .deilimgurl{
                 display: inline-block;
                 width: 240px;
                 height:140px;
                 border:1px solid #ebebeb; 
                 border-radius: 5px;     
           }
           .concrnttestName{
                 display: inline-block;
                 vertical-align: top; 
                 .nametitle{
                     font-size: 30px;
                     font-family: "微软雅黑";
                     color: #414c50;
                     margin: 15px 0px 0px 45px;
                 }   
                 .conctentNamebottom{
                       display: inline-block;
                       margin: 5px 0px 0px 45px;
                       color: #414c50;
                 } 
                 .progreddbar{
                     display: inline-block;
                     width: 220px;
                     margin-left:45px;
                     .havelearn{
                          color: #3fa9f5; 
                     }
                 } 
           }
           .testnumber{
                width: 1000px;
                height: 40px;
                border-bottom:1px solid #dee3e2;
                line-height: 40px;
                border-top:0px;
                font-family: "微软雅黑";
                color: #b5b5b5;
              
           }
           .movetop{
               color: #3fa9f5;  
               height:70px;
               transition: height 1s;
               cursor: pointer;
           }
           .moveover{
             // font-color: #b5b5b5; 
               color:  #b5b5b5; 
           }
           .testDesc{
                margin-left:45px;
                color: #414c50;
                height: 20px;
                line-height: 20px;
                margin-top: 5px;
           }
           .overread{
               color: #3fa9f5;   
           }

</style>