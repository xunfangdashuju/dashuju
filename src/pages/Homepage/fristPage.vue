<template>
         <el-row>
            <el-col :span='24' >
               <div class="Classification">
                 <div class="ClassficaName">体系分类:</div>

                     <el-button
                          class="Namecoure"
                           v-for="(item,index) in  optionstixi"
                           :key='item.courseStructureId' 
                           @click="currentcourse(index,item.courseStructureId)"
                           :class="select===index  ? 'active':'activefalse' "
                          >
                            {{item.courseStructureName}}
                     </el-button>
                     <hr/>
                    <div class="ClassficaName">分类标签:</div>  
                    <el-button
                           class='Namecoure'
                           v-for="(item,index) in  fenleidata"
                           :key='item.courseClassificationId' 
                           @click="currentClass(index,item.courseClassificationId)"
                           :class="selectClassific===index ?'activeClassific':'activeClassificfalse'"
                          >
                            {{item.courseClassificationName}}
                     </el-button> 
               </div>
               <hr/>
            </el-col>
             <el-col :span="24">
                   <div class='Classification'>
                     <div   class="stytemstyle "      v-for="item in  concentdata" :key="item.bean.courseStructureId" @click="stytemclick(item)">
                          <img  :src=" `${baseUrl}/file/${item.bean.imageUrl}`" alt="" class="stytemcover">
                            <div class="courseStructureName">
                                <span class="couseStryname">
                                    {{item.bean.courseContentName}}
                                 </span>
                            </div>
                             <div class="allCount">
                                 <span>
                                    <i class="fa fa-cubes experimantation" aria-hidden="true">
                                        {{item.num.experimentCount}}   
                                    </i>
                                    <span class="testCount">个实验</span>
                                 </span>
                                 <span class="author">
                                     <i class="fa fa-graduation-cap experimantation" aria-hidden="true">
                                           {{item.num.allCount}}
                                    </i>   
                                     <span class="testCount">个学习</span>
                                 </span>
                             </div>
                    </div> 
                   </div>
               </el-col>
           <el-col :span="24">
             <page-compent
               :pagetotal="paggtatol"
               :pageSize="pageSize"
               @currentpage="pageIndexChange"
               >
             </page-compent>
            </el-col>

         </el-row>
</template>
<script>
 import {experimentpagelist} from "@/api/api";
 import {baseUrl} from '../../../static/baseurl'
    import pageCompent from "@/components/pagintion"
    export default {
      components: {
            pageCompent
        },
         data(){
               return{
                   currentPage:1,
                    pageSize:10,
                    paggtatol:null,
                    baseUrl,
                    selectClassific:0,//点击分类
                    select:0,//点击体系
                    fenleidata:[],
                    optionstixi:[],//体系 
                    struId:'',//体系id
                    courseClassificationId:'',//分类id 
                    concentdata:[],//内容展示数组
               }
         },
         methods:{     
                getcourseStructurepage() {//体系点击的//首页显示的
                var params = {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    struId:this.struId,
                    courseClassificationId:this.courseClassificationId,
                };
                experimentpagelist(params).then(res => {
                    if (res.data.code == 0) {
                         console.log("--------t体系---")
                         console.log(res)
                     this.optionstixi = res.data.data.structure;//体系
                     this.optionstixi.unshift({
                           courseStructureId:'000',
                           courseStructureName:'全部',
                          })


                       this.fenleidata=res.data.data.classification//分类
                        
                      if( this.fenleidata.length!=0){
                                this.fenleidata.unshift({
                                    courseClassificationId:'111' ,
                                    courseClassificationName:'全部',
                                })
                             if(res.data.data.content !==null){
                                      console.log('====')
                                      if(res.data.data.content.list.length !==0){
                                            this.concentdata=res.data.data.content.list
                                            this.paggtatol=res.data.data.content.total
                                      }
                             }else{
                                    this.paggtatol=0
                                    this.concentdata=[]
                                 }
                      }else{
                             this.paggtatol=0
                             this.concentdata=[]
                       }
                     }
                   });
                },
                pageIndexChange(index){//翻页
                    this.paggtatol=index  
                    this.getcourseStructurepage()

              },


                currentcourse(index,courseid){//当前点击的体系
                     this.select=index 
                     console.log(index)
                     console.log(courseid)
                     if(courseid=='000'){
                              this.struId='';
                              this.courseClassificationId='';
                              this.currentPage=1;
                              this.pageSize=10;
                              this.getcourseStructurepage() //点击体系的全部的时候,全部重新赋值,
                     }else{
                              this.struId=courseid 
                              this.getcourseStructurepage() //点击体系的全部的时候
                     }
                },
                currentClass(index,courseClassificationId){//点击当前分类
                    console.log("fenlei")
                    console.log(index)
                    this.selectClassific=index  
                    console.log(courseClassificationId)
                    if(courseClassificationId=="111"){
                           this.courseClassificationId='';  
                           this.getcourseStructurepage() //点击体系的全部的时候,   
                       }else{
                             this.courseClassificationId=courseClassificationId
                             this.getcourseStructurepage() //点击体系的全部的时候, 
                       }

                },
              stytemclick(item){
                     console.log("------")
                     console.log(item)
                     this.$router.push({name:'testDetailStep',params:{id:item.bean.courseContentId,}})
              },
         },
         mounted(){
               this.getcourseStructurepage() 
         }
    }
</script>

<style  lang='scss' scoped>


     .active{
         color:#409EFF;
    }
    .activefalse{
          color: #fff;
          
    }
    .Namecoure{
            background-color:#dcdfe6;
            border: none;      
    }
    .activeClassific{
          color:#409EFF;
     }
     .activeClassificfalse{
           color: #fff;
     }
     /* .Namecoure :hover{
          background-color:aqua;
     } */
  

.allCount{
      line-height: 28px;
}
.experimantation{
     color: #3dacf3;
     margin: 0px 5px;
}
.testCount{
    color: #717b82;
    font-family: '微软雅黑';
    font-size: 12px;
}
 .author{
     width:90px;
     float: right;
  }
</style>