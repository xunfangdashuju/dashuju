<template>
<el-row class="loginConteiner">
    <canvas id="canvas"></canvas>
  <div></div>
  <span class="frame">
    <el-form :model="LoginForm" :rules="rules" ref="loginForm" class="LoginForm" size="small">
      <span class="companyName">讯方大数据创新实训系统</span>
      <el-form-item prop="name">
        <el-input v-model="LoginForm.name" placeholder="  请输入用户名">
          <i slot="prefix" class="el-input__icon fa fa-user-circle-o fa-lg logincolor"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="pass" :error="showError">
        <el-input
          v-model="LoginForm.pass"
          placeholder="  请输入密码"
          @keyup.native.enter="submitForm()"
          type="password"
        >
          <i slot="prefix" class="el-input__icon fa fa-key fa-lg logincolor"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="button" @click.native="submitForm" value="登录" class="Enter"></el-input>
      </el-form-item>
    </el-form>
  </span>
  <div class="statement">Copyright © 2017 - 2020 深圳市讯方技术股份有限公司 粤ICP备12068225号-1</div>
</el-row>
</template>
<script>
import { userlogin} from "@/api/api";
import qs from "qs";

export default {
  data() {
    return {
      LoginForm: {
        name: "",
        pass: ""
      },
      showError: null
    };
  },
  computed: {
    rules() {
      return {
        name: [{ required: true, message: "输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      };
    }
  },
  methods: {
    submitForm() {
      this.showError = null;
      var parms = {
        userAccount: this.LoginForm.name,
        userPassword: this.LoginForm.pass
      };
    //  this.$router.push("/examtionpaperadd");
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          
          let user = { name: this.LoginForm.name };
          userlogin(parms).then(res => {
            console.log("登录")
            console.log(res);
            if (res.data.code == 0) {
              sessionStorage.setItem("user", JSON.stringify(user)); //判断是不是在登录
              sessionStorage.setItem("token", res.data.data.token);
              sessionStorage.setItem(
                "username",
                res.data.data.user.userAccount
              );
              sessionStorage.setItem('uid',res.data.data.user.uid)
               this.$router.push("/fristPage");
            } else {
              this.showError = "用户名或密码错误";
            }
          });
          //  sessionStorage.setItem('user', JSON.stringify(user));
        } else {
          console.log("err");
          return false;
        }
      });
    }
  },
  mounted() {
    $(document).ready(function() {
      window.requestAnimFrame = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(a) {
            window.setTimeout(a, 1e3 / 60);
          }
        );
      })();

      // $ = {};

      $.util = {
        rand: function(min, max) {
          return Math.random() * (max - min) + min;
        },
        randInt: function(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        norm: function(val, min, max) {
          return (val - min) / (max - min);
        },
        lerp: function(norm, min, max) {
          return (max - min) * norm + min;
        },
        map: function(val, sMin, sMax, dMin, dMax) {
          return $.util.lerp($.util.norm(val, sMin, sMax), dMin, dMax);
        },
        clamp: function(val, min, max) {
          return Math.min(
            Math.max(val, Math.min(min, max)),
            Math.max(min, max)
          );
        },
        distance: function(p1, p2) {
          var dx = p1.x - p2.x,
            dy = p1.y - p2.y;
          return Math.sqrt(dx * dx + dy * dy);
        },
        angle: function(p1, p2) {
          return Math.atan2(p1.y - p2.y, p1.x - p2.x);
        },
        inRange: function(val, min, max) {
          return val >= Math.min(min, max) && val <= Math.max(min, max);
        },
        pointInRect: function(x, y, rect) {
          return (
            $.util.inRange(x, rect.x, rect.x + rect.width) &&
            $.util.inRange(y, rect.y, rect.y + rect.height)
          );
        },
        pointInArc: function(p, a) {
          return distance(p, a) <= a.radius;
        },
        setProps: function(obj, props) {
          for (var k in props) {
            obj[k] = props[k];
          }
        },
        multicurve: function(points, ctx) {
          var p0, p1, midx, midy;
          ctx.moveTo(points[0].x, points[0].y);
          for (var i = 1; i < points.length - 2; i += 1) {
            p0 = points[i];
            p1 = points[i + 1];
            midx = (p0.x + p1.x) / 2;
            midy = (p0.y + p1.y) / 2;
            ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);
          }
          p0 = points[points.length - 2];
          p1 = points[points.length - 1];
          ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
        }
      };

      $.init = function() {
        // setup
        $.c = document.getElementById("canvas");
        $.ctx = $.c.getContext("2d");

        // collections
        $.ports = [];
        $.planes = [];

        // events
        window.addEventListener("resize", $.reset, false);
        window.addEventListener("click", $.reset, false);
        $.reset();
        $.step();
      };

      $.reset = function() {
        // dimensions
        $.cw = $.c.width = window.innerWidth;
        $.ch = $.c.height = window.innerHeight;
        $.dimAvg = ($.cw + $.ch) / 2;

        // type / font
        $.ctx.textAlign = "center";
        $.ctx.textBaseline = "middle";
        $.ctx.font = "16px monospace";

        // options / settings
        $.opt = {};
        $.opt.portCount = 6;
        $.opt.planeCount = 80;
        $.opt.portSpacingDist = $.dimAvg / $.opt.portCount;
        $.opt.holdingDist = 5;
        $.opt.approachDist = 80;
        $.opt.planeDist = 20;
        $.opt.pathSpacing = 15;
        $.opt.pathCount = 40;
        $.opt.avoidRadius = 30;
        $.opt.avoidMult = 0.025;

        // collections
        $.ports.length = 0;
        $.planes.length = 0;

        // delta
        $.lt = Date.now();
        $.dt = 1;
        $.et = 0;
        $.tick = 0;

        // setup ports
        for (var i = 0; i < $.opt.portCount; i++) {
          $.ports.push(new $.Port());
        }

        // setup planes
        for (var i = 0; i < $.opt.planeCount; i++) {
          $.planes.push(new $.Plane());
        }
      };

      $.Port = function() {
        this.x = $.util.rand($.cw * 0.1, $.cw * 0.9);
        this.y = $.util.rand($.ch * 0.1, $.ch * 0.9);
        while (!this.validSpacing()) {
          this.x = $.util.rand($.cw * 0.1, $.cw * 0.9);
          this.y = $.util.rand($.ch * 0.1, $.ch * 0.9);
        }
      };

      $.Port.prototype.validSpacing = function() {
        var spaced = true,
          i = $.ports.length;
        while (i--) {
          var otherPort = $.ports[i];
          if ($.util.distance(otherPort, this) < $.opt.portSpacingDist) {
            spaced = false;
            break;
          }
        }
        return spaced;
      };

      $.Port.prototype.update = function(i) {
        var j = $.planes.length;
        this.approachingCount = 0;
        while (j--) {
          var plane = $.planes[j];
          if (plane.destIndex == i && plane.approaching) {
            this.approachingCount++;
          }
        }
      };

      $.Port.prototype.render = function(i) {
        $.ctx.beginPath();
        $.ctx.arc(
          this.x,
          this.y,
          3 + (this.approachingCount + 5),
          0,
          Math.PI * 2
        );
        $.ctx.fillStyle =
          "hsla(120, 90%, 80%, " + (0.35 + Math.sin($.et / 20) * 0.2) + ")";
        $.ctx.fill();

        $.ctx.fillStyle = "#fff";
        $.ctx.fillText(this.approachingCount, this.x, this.y - 30);
      };

      $.Plane = function(opt) {
        this.originIndex = $.util.randInt(0, $.ports.length - 1);
        this.origin = $.ports[this.originIndex];
        this.path = [];
        this.x = this.origin.x;
        this.y = this.origin.y;
        this.vx = $.util.rand(-0.35, 0.35);
        this.vy = $.util.rand(-0.35, 0.35);
        this.vmax = 1;
        this.accel = 0.01;
        this.decel = 0.96;
        this.angle = 0;
        this.approaching = false;
        this.holding = false;
        this.setDest();
      };

      $.Plane.prototype.setDest = function() {
        if (this.destIndex != undefined) {
          this.originIndex = this.destIndex;
          this.origin = $.ports[this.originIndex];
        }
        this.destIndex = $.util.randInt(0, $.ports.length - 1);
        while (this.destIndex == this.originIndex) {
          this.destIndex = $.util.randInt(0, $.ports.length - 1);
        }
        this.dest = $.ports[this.destIndex];
        this.approaching = false;
        this.holding = false;
      };

      $.Plane.prototype.update = function(i) {
        this.ox = this.x;
        this.oy = this.y;
        if ($.tick % $.opt.pathSpacing == 0) {
          this.path.push({ x: this.x, y: this.y });
        }
        if (this.path.length > $.opt.pathCount) {
          this.path.shift();
        }

        this.angle = $.util.angle(this.dest, this);
        this.speed = (Math.abs(this.vx) + Math.abs(this.vy)) / 2;

        if (
          !$.util.pointInRect(this.x, this.y, {
            x: 0,
            y: 0,
            width: $.cw,
            height: $.ch
          })
        ) {
          this.vx *= this.decel;
          this.vy *= this.decel;
        }

        if (this.speed > 0.1) {
          if ($.util.distance(this.dest, this) < $.opt.approachDist) {
            this.vx *= this.decel;
            this.vy *= this.decel;
            this.approaching = true;
          }
        }

        if ($.util.distance(this.dest, this) < $.opt.holdingDist) {
          this.holding = true;
          this.setDest();
        }
        this.vx += Math.cos(this.angle) * this.accel;
        this.vy += Math.sin(this.angle) * this.accel;
        if (this.speed > this.vmax) {
          this.vx *= this.decel;
          this.vy *= this.decel;
        }

        this.x += this.vx * $.dt;
        this.y += this.vy * $.dt;
      };

      $.Plane.prototype.render = function(i) {
        if (this.approaching) {
          $.ctx.strokeStyle = "hsla(0, 80%, 50%, 1)";
        } else {
          $.ctx.strokeStyle = "hsla(180, 80%, 50%, 1)";
        }

        $.ctx.beginPath();
        $.ctx.moveTo(this.x, this.y);
        var angle = $.util.angle({ x: this.ox, y: this.oy }, this);
        $.ctx.lineWidth = 2;
        $.ctx.lineTo(
          this.x - Math.cos(angle) * (3 + this.speed * 2),
          this.y - Math.sin(angle) * (3 + this.speed * 2)
        );
        $.ctx.stroke();

        var pathLength = this.path.length;
        if (pathLength > 1) {
          $.ctx.strokeStyle = "hsla(0, 0%, 100%, 0.15)";
          $.ctx.lineWidth = 1;
          $.ctx.beginPath();

          if (pathLength >= $.opt.pathCount) {
            var angle = $.util.angle(this.path[1], this.path[0]),
              dx = this.path[0].x - this.path[1].x,
              dy = this.path[0].y - this.path[1].y,
              dist = Math.sqrt(dx * dx + dy * dy),
              x =
                this.path[0].x +
                Math.cos(angle) *
                  (dist * (($.tick % $.opt.pathSpacing) / $.opt.pathSpacing)),
              y =
                this.path[0].y +
                Math.sin(angle) *
                  (dist * (($.tick % $.opt.pathSpacing) / $.opt.pathSpacing));
          } else {
            var x = this.path[0].x,
              y = this.path[0].y;
          }

          $.ctx.moveTo(x, y);
          for (var i = 1; i < pathLength; i++) {
            var point = this.path[i];
            $.ctx.lineTo(point.x, point.y);
          }
          $.ctx.lineTo(this.x, this.y);
          $.ctx.stroke();
        }
      };

      $.step = function() {
        requestAnimFrame($.step);

        // clear
        $.ctx.globalCompositeOperation = "destination-out";
        $.ctx.fillStyle = "hsla(0, 0%, 0%, 1)";
        $.ctx.fillRect(0, 0, $.cw, $.ch);
        $.ctx.globalCompositeOperation = "lighter";

        // collections
        var i;
        i = $.ports.length;
        while (i--) {
          $.ports[i].update(i);
        }
        i = $.planes.length;
        while (i--) {
          $.planes[i].update(i);
        }
        i = $.ports.length;
        while (i--) {
          $.ports[i].render(i);
        }
        i = $.planes.length;
        while (i--) {
          $.planes[i].render(i);
        }

        // delta
        var now = Date.now();
        $.dt = $.util.clamp((now - $.lt) / (1000 / 60), 0.001, 10);
        $.lt = now;
        $.et += $.dt;
        $.tick++;
      };

      $.init();

      //激光

      let canvas, ctx, w, h, laser, text, particles, input;
      function Laser(options) {
        options = options || {};
        this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 20);
        this.maxlife = this.lifespan;
        this.color = options.color || "#07183f"; //激光颜色..000
        this.x = options.x || Math.random() * w;
        this.y = options.y || Math.random() * h;
        this.width = options.width || 2;

        this.update = function(index, array) {
          this.lifespan > 0 && this.lifespan--;
          this.lifespan <= 0 && this.remove(index, array);
        };

        this.render = function(ctx) {
          if (this.lifespan <= 0) return;
          ctx.beginPath();
          ctx.globalAlpha = this.lifespan / this.maxlife;
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.width;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(w, this.y);
          ctx.stroke();
          ctx.closePath();
        };

        this.remove = function(index, array) {
          array.splice(index, 1);
        };
      }

      function Spark(options) {
        options = options || {};
        this.x = options.x || w * 0.5;
        this.y = options.y || h * 0.5;
        this.v = options.v || {
          direct: Math.random() * Math.PI * 2,
          weight: Math.random() * 10 + 2,
          friction: 0.94
        };
        this.a = options.a || {
          change: Math.random() * 0.2 - 0.1,
          min: this.v.direct - Math.PI * 0.4,
          max: this.v.direct + Math.PI * 0.4
        };
        this.g = options.g || {
          direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2),
          weight: Math.random() * 0.5 + 0.5
        };
        this.width = options.width || Math.random() * 3;
        this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
        this.maxlife = this.lifespan;
        this.color = options.color || "#fdab23";
        this.prev = { x: this.x, y: this.y };

        this.update = function(index, array) {
          this.prev = { x: this.x, y: this.y };
          this.x += Math.cos(this.v.direct) * this.v.weight;
          this.x += Math.cos(this.g.direct) * this.g.weight;
          this.y += Math.sin(this.v.direct) * this.v.weight;
          this.y += Math.sin(this.g.direct) * this.g.weight;
          this.v.weight *= this.v.friction;
          this.v.direct += this.a.change;
          (this.v.direct > this.a.max || this.v.direct < this.a.min) &&
            (this.a.change *= -1);
          this.lifespan > 0 && this.lifespan--;
          this.lifespan <= 0 && this.remove(index, array);
        };

        this.render = function(ctx) {
          if (this.lifespan <= 0) return;
          ctx.beginPath();
          ctx.globalAlpha = this.lifespan / this.maxlife;
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.width;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.prev.x, this.prev.y);
          ctx.stroke();
          ctx.closePath();
        };

        this.remove = function(index, array) {
          array.splice(index, 1);
        };
      }

      function Particles(options) {
        options = options || {};
        this.max = options.max || Math.round(Math.random() * 20 + 10);
        this.sparks = [...new Array(this.max)].map(() => new Spark(options));

        this.update = function() {
          this.sparks.forEach((s, i) => s.update(i, this.sparks));
        };

        this.render = function(ctx) {
          this.sparks.forEach(s => s.render(ctx));
        };
      }

      function Text(options) {
        options = options || {};
        const pool = document.getElementById("canvas");
        const buffer = pool.getContext("2d");

        pool.width = w;
        buffer.fillStyle = "#000"; //激光后面的跟着的颜色#07183f
        buffer.fillRect(0, 0, pool.width, pool.height);
        this.size = options.size || 40;
        this.copy = (options.copy || `Hello!`) + " ";
        this.color = options.color || "#fecd96";
        this.delay = options.delay || 4;
        this.basedelay = this.delay;
        buffer.font = `${this.size}px Comic Sans MS`;
        this.bound = buffer.measureText(this.copy);
        this.bound.height = this.size * 1.5;
        // this.x = options.x || w * 0.5 - this.bound.width * 0.5;
        // this.y = options.y || h * 0.5 - this.size * 0.5;
        this.x = 20;
        this.y = 10;
        buffer.strokeStyle = this.color;
        buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
        this.data = buffer.getImageData(
          0,
          0,
          this.bound.width,
          this.bound.height
        );
        this.index = 0;

        this.update = function() {
          if (this.index >= this.bound.width) {
            this.index = 0;
            return;
          }
          const data = this.data.data;
          for (
            let i = this.index * 4;
            i < data.length;
            i += 4 * this.data.width
          ) {
            const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
            if (bitmap > 255 && Math.random() > 0.86) {
              const x = this.x + this.index;
              const y = this.y + i / this.bound.width / 4;
              laser.push(
                new Laser({
                  x: x,
                  y: y
                })
              );
              Math.random() > 0.7 &&
                particles.push(
                  new Particles({
                    x: x,
                    y: y
                  })
                );
            }
          }
          this.delay-- < 0 && (this.index++ && (this.delay += this.basedelay));
        };

        this.render = function(ctx) {
          ctx.putImageData(
            this.data,
            this.x,
            this.y,
            0,
            0,
            this.index,
            this.bound.height
          );
        };
      }

      function loop() {
        update();
        render();
        requestAnimationFrame(loop);
      }

      function update() {
        text.update();
        laser.forEach((l, i) => l.update(i, laser));
        particles.forEach(p => p.update());
      }

      function render() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        //
        ctx.globalCompositeOperation = "screen";
        text.render(ctx);

        laser.forEach(l => l.render(ctx));
        particles.forEach(p => p.render(ctx));
      }

      (function() {
        //
        canvas = document.getElementById("canvas");
        input = document.getElementById("input");
        ctx = canvas.getContext("2d");
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        laser = [];
        particles = [];
        //
        text = new Text({
          copy: "讯方大数据创新实训系统"
        });

        loop();
      })();
    });
  }
};
</script>
<style lang="scss" scoped>
.loginConteiner {
  position: relative;
  //  background: url(../../assets/imgs/loginback.jpg);
  height: 100%;
  .LoginForm {
    ///  position: absolute;
    display: inline-block;
    // top: 50%;
    // left: 50%;
    // margin-left: -106px;
    // margin-top: -70px;
    margin-top: 30px;
    .companyName {
      height: 30px;
      display: inline-block;
      color: #fff;
    }
  }
  .frame {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 340px;
    height: 240px;
    margin-top: -120px;
    margin-left: -180px;
    // background-color: rgba(22,24,67,.3);
    border: 1px solid #f2f2f2;
    border-radius: 10px;
    text-align: center;
    // line-height: 300px;
  }
}
</style>
<style>
.Enter input {
  cursor: pointer;
  background: #409eff;
  color: #fff;
}
.logincolor {
  color: #409eff;
}
* {
  margin: 0;
  padding: 0;
}
canvas {
  background: #000;
  background-size: cover;
  display: block;
}
.statement {
  color: #fff;
  text-align: center;
  position: fixed;
  bottom: 20px;
  width: 100%;
  font-size: 20px;
}
</style>



