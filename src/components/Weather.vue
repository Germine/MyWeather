<template>
  <div class="myapp">
  	<mt-header title="Weather" class="my-header">
	  </router-link>
	</mt-header>

	<div class="cur-weather">
		<div class="city" @click='changeCity'>
			<yd-icon name="location" class="cur-location"></yd-icon>
			<div class="cur-city">
				{{city}}<p>点击切换城市</p>
			</div>
		</div>

		<div class="cur-date">{{nowTime}}</div>
		<div class="line"></div>
		<div class="cur-pic"><img :src="nowWea.wcode" alt=""></div>
		<div class="cur-tmp">{{nowWea.tmp}}°</div>
		<div class="cur-hum">{{nowWea.hum}}°</div>
		<div class="cur-txt">{{nowWea.txt}}</div>
	</div>

	<div class="fut-box">
		<div class="fut-topic">未来三天天气</div>
		<div class="fut-weather" v-for="item in futWea">
			<div class="fut-date">日期：{{item.date}}</div>
			<div class="fut-tmp">温度：{{item.mintmp}}° ~ {{item.maxtmp}}°</div>
			<div class="fut-pic"><img :src="item.wcode" alt=""></div>
			<div class="fut-txt">{{item.txt}}</div>
		</div>
	</div>

	<yd-popup v-model="ischange" position="bottom" height="50%">
        <yd-search :result="result" fullpage v-model="svalue" :item-click="thisCity"></yd-search>
    </yd-popup>

  </div>
</template>



<script>

export default {
  name: 'weather',
  data () {
    return {
      city:'广州',
      nowTime:'',
      ischange:false,
      svalue:'',
      result:[],
      nowWea:{
      	wcode:'',
      	txt:'',
      	tmp:'',
      	hum:''
      },
      futWea:{
      	0:{  
      		date:'',  	
	      	wcode:'',
	      	txt:'',
	      	mintmp:'',
	      	maxtmp:'',
	    },
      	1:{   
      		date:'',   	
	      	wcode:'',
	      	txt:'',
	      	mintmp:'',
	      	maxtmp:'',
	    },
	    2:{      
	    	date:'',	
	      	wcode:'',
	      	txt:'',
	      	mintmp:'',
	      	maxtmp:'',
	    },	    
      }
    }
  },
  methods:{
  	changeCity: function(){
  		this.ischange = !this.ischange;
  		console.log(this.ischange);
  	},
  	getResult:function(val) {
        if (!val) return [];
        let arr=[];
		this.$http.get('https://search.heweather.com/find?location='+ val + '&key=d2f71e42d977417e9069661b26c3f862')
		        .then((result) => {   
		            let citylist = result.body.HeWeather6[0].basic;
		            let i=0;
		            console.log(citylist);
		            for(i;i<6;i++){
		            	console.log(citylist[i].location);
						this.result.push(citylist[i].location);
		            }
		        }, (result) => {
		        	alert('请求失败！')
		        });
        return arr.filter(value => new RegExp(val, 'i').test(value));
    },
    thisCity:function(value){
    	this.city = value;
    	this.ischange = false;
		// 实时天气接口
	    this.$http.get('https://free-api.heweather.com/s6/weather/now?location='+ this.city + '&key=d2f71e42d977417e9069661b26c3f862')
	        .then((result) => {
	        	let wea = result.body.HeWeather6[0].now;
	            // console.log(wea)
				this.$set(this.nowWea,'wcode','../../static/cond-icon-heweather/'+wea.cond_code+'.png');
				this.$set(this.nowWea,'txt',wea.cond_txt);
				this.$set(this.nowWea,'tmp',wea.tmp);
				this.$set(this.nowWea,'hum',wea.hum);
				// console.log(this.nowWea)
	        }, (result) => {
	        	alert('请求失败！')
	        });

	    // 未来天气接口
	    this.$http.get('https://free-api.heweather.com/s6/weather/forecast?location='+ this.city + '&key=d2f71e42d977417e9069661b26c3f862').then((result) => {
	    	let fwea = result.body.HeWeather6[0].daily_forecast;
			console.log(fwea);
	        let i=0
	        for(i;i<fwea.length;i++)
	        {
				this.$set(this.futWea[i],'date',fwea[i].date);
				this.$set(this.futWea[i],'wcode','../../static/cond-icon-heweather/'+fwea[i].cond_code_d+'.png');
				this.$set(this.futWea[i],'txt',fwea[i].cond_txt_d);
				this.$set(this.futWea[i],'mintmp',fwea[i].tmp_min);
				this.$set(this.futWea[i],'maxtmp',fwea[i].tmp_max);
	        }
			console.log(this.futWea[0])
	    }, (result) => {
	    	alert('请求失败！')
	    });
    	
    }
  },
  mounted: function(){
	// 日期 
    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth()+1;
    let day = today.getDate();
    this.nowTime =year + '-' + month + '-' + day;

    // 实时天气接口
    this.$http.get('https://free-api.heweather.com/s6/weather/now?location='+ this.city + '&key=d2f71e42d977417e9069661b26c3f862')
        .then((result) => {
        	let wea = result.body.HeWeather6[0].now;
            // console.log(wea)
			this.$set(this.nowWea,'wcode','../../static/cond-icon-heweather/'+wea.cond_code+'.png');
			this.$set(this.nowWea,'txt',wea.cond_txt);
			this.$set(this.nowWea,'tmp',wea.tmp);
			this.$set(this.nowWea,'hum',wea.hum);
			// console.log(this.nowWea)
        }, (result) => {
        	alert('请求失败！')
        });

    // 未来天气接口
    this.$http.get('https://free-api.heweather.com/s6/weather/forecast?location='+ this.city + '&key=d2f71e42d977417e9069661b26c3f862').then((result) => {
    	let fwea = result.body.HeWeather6[0].daily_forecast;
		console.log(fwea);
        let i=0
        for(i;i<fwea.length;i++)
        {
			this.$set(this.futWea[i],'date',fwea[i].date);
			this.$set(this.futWea[i],'wcode','../../static/cond-icon-heweather/'+fwea[i].cond_code_d+'.png');
			this.$set(this.futWea[i],'txt',fwea[i].cond_txt_d);
			this.$set(this.futWea[i],'mintmp',fwea[i].tmp_min);
			this.$set(this.futWea[i],'maxtmp',fwea[i].tmp_max);
        }
		console.log(this.futWea[0])
    }, (result) => {
    	alert('请求失败！')
    });

  },
  watch: {
    svalue:function(val) {
        this.result = this.getResult(val);
	},
}
}
</script>

<style rel="stylesheet/scss" lang="scss">

.myapp{
	width: 100%;
	height: 100%;
	min-height: 12rem;
	background: url(../../static/bg.jpg) no-repeat;
	background-size: cover;
	color: #FFFFFF;

	
	.my-header{
		background: rgba(255,255,255,0);
		height: 50px;
		color: #FFFFFF;
        line-height: 0.48rem;
        font:bold 0.34rem 'PingFangSC-Regular';
	}

	.cur-weather{
		width: 100%;
		height: 3rem;
		position: relative;
		
		.city{
			position: relative;
			width: 3.8rem;
			height: 1.5rem;

			.cur-location{
				position: absolute;
				top: 0.5rem;
				left: 0.5rem;
				width: 0.6rem;
				height: 0.6rem;
			}

			.cur-city{
				text-align: center;
				position: absolute;
				top: 0.3rem;
				left: 1.5rem;
				line-height: 0.6rem;
	        	font: 0.5rem 'PingFangSC-Semibold';
	        	p{
	        		font-size: 0.1rem;
	        	}
			}
		}
		
		.line{
			position: absolute;
			top: 0.2rem;
			left: 50%;
			width: 0;
			height: 80%;
			border: 0.02rem dashed #FFF;
		}

		.cur-date{
			position: absolute;
			top: 1.8rem;
			left: 1rem;
			line-height: 0.3rem;
        	font: 0.3rem 'PingFangSC-Semibold';			
		}

		.cur-pic{
			position: absolute;
			top: 0.4rem;
			right: 1.8rem;
			width: 0.8rem;
			height: 0.8rem;

			padding-left: 50px;
			overflow: hidden;
			img{
			    width:0.8rem;
			    height:0.8rem;
			    filter: drop-shadow(-50px 0px 0rem rgb(255,255,255));
			}
		}

		.cur-txt{
			position: absolute;
			width: 1.5rem;
			top: 0.45rem;
			right: 0.5rem;
			line-height: 0.6rem;
        	font: 0.5rem 'PingFangSC-Semibold';
        	text-align: center;
		}

		.cur-tmp{
			position: absolute;
			top: 1.8rem;
			right: 2rem;
			line-height: 0.3rem;
        	font: 0.3rem 'PingFangSC-Semibold';
        	background: url(../../static/温度.png) no-repeat;
        	width: 1rem;
        	padding-left: 0.5rem;
        	background-size: contain;	
        	background-position: 0.1rem 0;
		}

		.cur-hum{
			position: absolute;
			top: 1.8rem;
			right: 0.8rem;
			line-height: 0.3rem;
        	font: 0.3rem 'PingFangSC-Semibold';	
        	background: url(../../static/湿度.png) no-repeat;
        	width: 1rem;
        	padding-left: 0.5rem;
        	background-size: contain;	
        	background-position: 0.1rem 0;			
		}
	}

	.fut-box{
		width: 100%;
		padding: 0.5rem;
		.fut-topic{
			height: 0.5rem;
			line-height: 0.5rem;
	        font: 0.3rem 'PingFangSC-Semibold';	
		}
		.fut-weather{
			position: relative;
			width: 100%;
			height: 1.5rem;
			border-top: 0.02rem dotted #FFFFFF;
			border-bottom: 0.02rem dotted #FFFFFF; 
			
			.fut-date{
				position: absolute;
				top: 0.2rem;
				left: 0.2rem;
				line-height: 0.3rem;
	        	font: 0.3rem 'PingFangSC-Semibold';	
			}
			.fut-tmp{
				position: absolute;
				top: 0.8rem;
				left: 0.2rem;
				line-height: 0.3rem;
	        	font: 0.3rem 'PingFangSC-Semibold';	
			}
			.fut-txt{
				position: absolute;
				width: 2rem;
				text-align: center;
				top: 45%;
				transform:translateY(-50%);
				right: 1rem;
				line-height: 0.6rem;
	        	font: 0.5rem 'PingFangSC-Semibold';
			}
			.fut-pic{
				position: absolute;
				top: 45%;
				transform:translateY(-50%);
				right: 0.1rem;
				width: 0.8rem;
				height: 0.8rem;

				padding-left: 50px;
				overflow: hidden;
				img{
				    width:0.8rem;
				    height:0.8rem;
				    filter: drop-shadow(-50px 0px 0rem rgb(255,255,255));
				}
			}
		}
	}


	.yd-search-list-item{
		color: #000;
	}
}
</style>
