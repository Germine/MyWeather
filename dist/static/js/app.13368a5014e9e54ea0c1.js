webpackJsonp([1],{0:function(t,e){},"5OHe":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("IvJb"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var c=a("vSla")({name:"App"},s,!1,function(t){a("WgKg")},null,null).exports,i=a("zO6J"),o={name:"weather",data:function(){return{city:"广州",nowTime:"",ischange:!1,svalue:"",result:[],nowWea:{wcode:"",txt:"",tmp:"",hum:""},futWea:{0:{date:"",wcode:"",txt:"",mintmp:"",maxtmp:""},1:{date:"",wcode:"",txt:"",mintmp:"",maxtmp:""},2:{date:"",wcode:"",txt:"",mintmp:"",maxtmp:""}}}},methods:{changeCity:function(){this.ischange=!this.ischange,console.log(this.ischange)},getResult:function(t){var e=this;if(!t)return[];return this.$http.get("https://search.heweather.com/find?location="+t+"&key=d2f71e42d977417e9069661b26c3f862").then(function(t){var a=t.body.HeWeather6[0].basic,n=0;for(console.log(a);n<6;n++)console.log(a[n].location),e.result.push(a[n].location)},function(t){alert("请求失败！")}),[].filter(function(e){return new RegExp(t,"i").test(e)})},thisCity:function(t){var e=this;this.city=t,this.ischange=!1,this.$http.get("https://free-api.heweather.com/s6/weather/now?location="+this.city+"&key=d2f71e42d977417e9069661b26c3f862").then(function(t){var a=t.body.HeWeather6[0].now;e.$set(e.nowWea,"wcode","http://cdn.heweather.com/cond_icon/"+a.cond_code+".png"),e.$set(e.nowWea,"txt",a.cond_txt),e.$set(e.nowWea,"tmp",a.tmp),e.$set(e.nowWea,"hum",a.hum)},function(t){alert("请求失败！")}),this.$http.get("https://free-api.heweather.com/s6/weather/forecast?location="+this.city+"&key=d2f71e42d977417e9069661b26c3f862").then(function(t){var a=t.body.HeWeather6[0].daily_forecast;console.log(a);for(var n=0;n<a.length;n++)e.$set(e.futWea[n],"date",a[n].date),e.$set(e.futWea[n],"wcode","http://cdn.heweather.com/cond_icon/"+a[n].cond_code_d+".png"),e.$set(e.futWea[n],"txt",a[n].cond_txt_d),e.$set(e.futWea[n],"mintmp",a[n].tmp_min),e.$set(e.futWea[n],"maxtmp",a[n].tmp_max);console.log(e.futWea[0])},function(t){alert("请求失败！")})}},mounted:function(){var t=this,e=new Date,a=e.getFullYear(),n=e.getMonth()+1,s=e.getDate();this.nowTime=a+"-"+n+"-"+s,this.$http.get("https://free-api.heweather.com/s6/weather/now?location="+this.city+"&key=d2f71e42d977417e9069661b26c3f862").then(function(e){var a=e.body.HeWeather6[0].now;t.$set(t.nowWea,"wcode","http://cdn.heweather.com/cond_icon/"+a.cond_code+".png"),t.$set(t.nowWea,"txt",a.cond_txt),t.$set(t.nowWea,"tmp",a.tmp),t.$set(t.nowWea,"hum",a.hum)},function(t){alert("请求失败！")}),this.$http.get("https://free-api.heweather.com/s6/weather/forecast?location="+this.city+"&key=d2f71e42d977417e9069661b26c3f862").then(function(e){var a=e.body.HeWeather6[0].daily_forecast;console.log(a);for(var n=0;n<a.length;n++)t.$set(t.futWea[n],"date",a[n].date),t.$set(t.futWea[n],"wcode","http://cdn.heweather.com/cond_icon/"+a[n].cond_code_d+".png"),t.$set(t.futWea[n],"txt",a[n].cond_txt_d),t.$set(t.futWea[n],"mintmp",a[n].tmp_min),t.$set(t.futWea[n],"maxtmp",a[n].tmp_max);console.log(t.futWea[0])},function(t){alert("请求失败！")})},watch:{svalue:function(t){this.result=this.getResult(t)}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"myapp"},[a("mt-header",{staticClass:"my-header",attrs:{title:"Weather"}}),t._v(" "),a("div",{staticClass:"cur-weather"},[a("div",{staticClass:"city",on:{click:t.changeCity}},[a("yd-icon",{staticClass:"cur-location",attrs:{name:"location"}}),t._v(" "),a("div",{staticClass:"cur-city"},[t._v("\n\t\t\t\t"+t._s(t.city)),a("p",[t._v("点击切换城市")])])],1),t._v(" "),a("div",{staticClass:"cur-date"},[t._v(t._s(t.nowTime))]),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"cur-pic"},[a("img",{attrs:{src:t.nowWea.wcode,alt:""}})]),t._v(" "),a("div",{staticClass:"cur-tmp"},[t._v(t._s(t.nowWea.tmp)+"°")]),t._v(" "),a("div",{staticClass:"cur-hum"},[t._v(t._s(t.nowWea.hum)+"°")]),t._v(" "),a("div",{staticClass:"cur-txt"},[t._v(t._s(t.nowWea.txt))])]),t._v(" "),a("div",{staticClass:"fut-box"},[a("div",{staticClass:"fut-topic"},[t._v("未来三天天气")]),t._v(" "),t._l(t.futWea,function(e){return a("div",{staticClass:"fut-weather"},[a("div",{staticClass:"fut-date"},[t._v("日期："+t._s(e.date))]),t._v(" "),a("div",{staticClass:"fut-tmp"},[t._v("温度："+t._s(e.mintmp)+"° ~ "+t._s(e.maxtmp)+"°")]),t._v(" "),a("div",{staticClass:"fut-pic"},[a("img",{attrs:{src:e.wcode,alt:""}})]),t._v(" "),a("div",{staticClass:"fut-txt"},[t._v(t._s(e.txt))])])})],2),t._v(" "),a("yd-popup",{attrs:{position:"bottom",height:"50%"},model:{value:t.ischange,callback:function(e){t.ischange=e},expression:"ischange"}},[a("yd-search",{attrs:{result:t.result,fullpage:"","item-click":t.thisCity},model:{value:t.svalue,callback:function(e){t.svalue=e},expression:"svalue"}})],1)],1)},staticRenderFns:[]};var u=a("vSla")(o,r,!1,function(t){a("e0BO")},null,null).exports;n.default.use(i.a);var l=new i.a({routes:[{path:"/",name:"weather",component:u}]}),h=a("OolZ"),d=a("wSez"),f=a.n(d),p=(a("5OHe"),a("vT+3")),m=a.n(p);a("Y96J");n.default.config.productionTip=!1,n.default.use(h.a),n.default.use(f.a),n.default.use(m.a),new n.default({el:"#app",router:l,components:{App:c},template:"<App/>"})},WgKg:function(t,e){},Y96J:function(t,e){},e0BO:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.13368a5014e9e54ea0c1.js.map