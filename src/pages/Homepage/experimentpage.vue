<template>
  <!-- <div>
           实验页面
  </div>-->
  <el-row>
   <div id="box">
        <el-col :span="24" id="top">
                <div  class="haedtop">
                     <el-button size='mini' class="exitquit" >
                         <i class="fa fa-circle-o-notch" aria-hidden="true" style="margin-right:5px;">
                        </i>退出
                    </el-button>
               </div > 
                   <el-tabs type="border-card"  class="ArticalSteps">
                         <el-tab-pane>
                            <span slot="label">
                                  <i class="fa fa-commenting-o" aria-hidden="true"></i>
                                目的和原理</span>
                        </el-tab-pane>
                        <el-tab-pane >
                               <span slot="label"><i class="fa fa-bars" aria-hidden="true"></i>
                               实验步骤</span>
                        </el-tab-pane>
                        <el-tab-pane >
                             <span slot="label"><i  class="fa fa-television" aria-hidden="true"></i>
                             虚拟机列表</span>
                        </el-tab-pane>
                        <el-tab-pane label="实验笔记">
                              <span slot="label"><i  class="fa fa-sticky-note-o" aria-hidden="true"></i>
                              实验笔记</span>
                        </el-tab-pane>
                  </el-tabs>
                  <div style="height:380px;overflow-y:auto">
                  <span style="word-wrap: break-word;" class="concontsteps" id="content"  >
                   
                 </span> 
               </div>
        </el-col>
        <el-col :span="24" id="bottom">

        </el-col>
        <div id="line"> 
           <!-- <i class="el-icon-sort" style="color:#fff" ></i> -->
           <i class="fa fa-exchange dragline" aria-hidden="true" ></i>
        </div>
     </div>
  </el-row>
</template>
 
<script>
// import EditorBar from './wangEditor'
 import{experimentcourseResourceinfo}from '@/api/api'
export default {
  data() {
    return {};
  },
  methods: {
      
          gettestdeil(){//获取实验详情页
                    const uid = sessionStorage.getItem('uid')   
                  var parms={
                            studentId:uid,
                            resourceManagementId:this.$route.params.id,
                            courseContentId:this.$route.params.contentid,   
                    }
                 experimentcourseResourceinfo(parms).then(res=>{
                         console.log('实验详情')
                         console.log(res)
                    
                 })

          },



  },
  mounted() {
    //    console.log("路由")
    //    console.log(this.$route)
     this.gettestdeil()



    $(document).ready(function() {


      function $(id) {
        return document.getElementById(id);
      }
      var oBox = $("box"),
        oTop = $("top"),
        oBottom = $("bottom"),
        oLine = $("line");
      oLine.onmousedown = function(e) {
        var disX = (e || event).clientX;
        oLine.left = oLine.offsetLeft;
        document.onmousemove = function(e) {
          var iT = oLine.left + ((e || event).clientX - disX);
          var e = e || window.event,
            tarnameb = e.target || e.srcElement;
          var maxT = oBox.clientWight - oLine.offsetWidth;
          oLine.style.margin = 0;
          iT < 0 && (iT = 0);
          iT > maxT && (iT = maxT);
          oLine.style.left = oTop.style.width = iT + "px";
          oBottom.style.width = oBox.clientWidth - iT + "px";

          return false;
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          oLine.releaseCapture && oLine.releaseCapture();
        };
        oLine.setCapture && oLine.setCapture();
        return false;
      };
    });
  }
};
</script>
<style  lang='scss'      scoped>
//  #box{position:relative;border:2px solid #000;overflow:hidden;height: 500px}
// #top,#bottom{color:#FFF;overflow:hidden;height: 500px;}
// #top{background:green; float:left ;}
// #bottom{background:#1a1e21;float:right;}
// #line{position:absolute;top:0;left:35%;height:100%;width:14px;overflow:hidden;background:#3fa9f5;cursor:w-resize;}
#box{position:relative;height:500px;border:2px solid #000;margin:0px 40px;;overflow:hidden;width: 1200px;}
#bottom{color:#FFF;width:700px;height:500px;overflow:hidden;}
#top{
    color:#FFF;width:500px;height:500px;overflow:hidden;
}
#top{background:green; float:left}
#bottom{background:#2d3438;float:right}
#line{position:absolute;top:0;left:41%;height:100%;width:14px;overflow:hidden;background:#3fa9f5;cursor:w-resize;}

.haedtop{
     height: 60px;
     background: #2d3438;
     line-height: 60px;
}  
.exitquit{
    margin-left: 30px;
}  
.dragline{
    position: relative;
    color: #fff;
    top: 50%;
}
.ArticalSteps{
      position: relative;
      top:0px;
}

</style>