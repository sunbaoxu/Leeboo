var Audios=function(opt){
	this.opt=opt.Name;
	this.prev=this.opt.prev;
	this.next=this.opt.next;
	this.back=this.opt.f_back;
	this.zou=this.opt.f_zou;
	this.mpge_bo=this.opt.mpge_bo;
	this.mp_gemu=this.opt.mp_gemu;
	this.mpge_hui=this.opt.mpge_hui;
	this.f_table=this.opt.f_table;
	this.list=this.opt.list;
	this.audio=$(this.opt.audio);
	this.index=0;
	this.length=0;
	
	this.init ()
	
}

Audios.prototype={
	init : function(){
		this.Tings()//开始  关闭
		this.Timeup()// 当轻音乐 播放时
		this.playfooter() //弹出 页脚  播放音乐

		this.mulu()
		this.Autobo()
	},
	//上一首
	Prevs : function(obj){
		var prev=this.prev;
		var that=this;

		$(prev).on("click",function(){
			var num=$(this).parents("#footer").attr("album_id")
			that.index--;

			if(that.index>=1){
				var ind=obj[that.index].song_id;
			}
			else{
				that.index=obj.length-1;
				var ind=obj[that.index].song_id;
			}
			
			$("#ting").removeClass("fa-pause").addClass("fa-play")

				var time=setInterval(function(){
					$("#ting").removeClass("fa-play").addClass(" fa-pause")

						that.Mulist_mulu(ind);//请求歌曲  进行播放
						clearInterval(time)
				},2000)
		})
	},
	//下一首
	Nexts : function(obj){
		var next=this.next;
		var that=this;
		$(next).on("click",function(){
			var num=$(this).parents("#footer").attr("album_id");

			that.index++;
			
			if(that.index<=obj.length-1){
				var ind=obj[that.index].song_id;
			}
			else{
				that.index=0;
				var ind=obj[that.index].song_id;
			}
			
			$("#ting").removeClass("fa-pause").addClass("fa-play")

				var time=setInterval(function(){
					$("#ting").removeClass("fa-play").addClass(" fa-pause")

						that.Mulist_mulu(ind);
						clearInterval(time)
				},2000)
			
		})

	},
	//开始  暂停  音乐
	Tings : function(){
		var audio=this.audio[0];
		var that=this;
		$("#ting").on("click",function(){

			if($("#ting").hasClass("fa-play")){

				that.Huanion1($(this))//变换图标  表示播放  与 停止

				audio.play()
				$(this).removeClass("fa-play").addClass(" fa-pause")
			}
			else{
				audio.pause()
				
				$(this).removeClass("fa-pause").addClass("fa-play")

				that.Huanion($(this))//变换图标  表示播放  与 停止


			}
		})
	},
	//变换图标  表示播放  与 停止
	Huanion: function (childs){
		var num=childs.parents("#footer").attr("album_id");
				var arr=$("#mp_gemu").find("img");
			for(var m=0;m<arr.length;m++){
				if($(arr[m]).attr("album_id")==num){
				$(arr[m]).attr("src","http://static.lebo.baidu.com/st/i/OfIYWWkI.png")
			}
		}
	},
	Huanion1: function (childs){
		var num=childs.parents("#footer").attr("album_id");
				var arr=$("#mp_gemu").find("img");
			for(var m=0;m<arr.length;m++){
				if($(arr[m]).attr("album_id")==num){
				$(arr[m]).attr("src","http://static.lebo.baidu.com/st/i/9uFQlWY5.gif")
			}
		}
	},
	//播放  进度条
	Timeup : function (){
			var back=this.back;
			var zou=this.zou;
			var audio=this.audio[0];
			audio.addEventListener("timeupdate",function(){
			var duration=this.duration;//总时间
			var currentTime=this.currentTime;//当前时间
			var w=$(back).width();
			var bei=currentTime/duration*w;
			
			$(zou).css("width",bei+"px")
		})

	},
	//弹出 页脚  播放音乐
	playfooter : function(){
			this.index=0;
		var audio=this.audio[0];
		var btn=this.mpge_bo;
		var fu=this.mp_gemu;
		var num=0;
		var that=this;

		$(fu).on("click",btn,function(){

		//$(".mapin_bot").css("margin-bottom","60px")

			if(!$(this).hasClass("on")){
				num=0;
				$(this).parents("section").siblings().find(".mpge_bo").removeClass("on");
			}

			$(this).addClass("on").parents("section").find(".mpge_bo").attr("src","http://static.lebo.baidu.com/st/i/H51z9oS0.png");
				if(num%3==0){
					$("#footer").css("display","block").attr("album_id",$(this).attr("album_id"));
					$(this).attr("src","http://static.lebo.baidu.com/st/i/9uFQlWY5.gif");

					that.Mulist($(this).attr("album_id"));

					audio.setAttribute("autoplay","autoplay")

					$("#ting").removeClass("fa-play").addClass(" fa-pause")
				}
				else if(num%3==1){
					$(this).attr("src","http://static.lebo.baidu.com/st/i/OfIYWWkI.png");		audio.pause()
				}
				else{
					$(this).attr("src","http://static.lebo.baidu.com/st/i/H51z9oS0.png");
					num=-1;
					$(".mapin_bot").css("margin-bottom","0px");
					$("#footer").css("display","none")
				}
				num++;
		})
	},
	Mulist : function(num){
		var audio=this.audio[0];
		var that=this;
		$.ajax({
			url:"http://leboapi.baidu.com/leboapi/album",
			data:{
					type:'getAlbumDetail',
					args:'*,songlist.song.pic',
					album_id:num,
					apiver:2,
					from:'lebowebapp',
					terminal:'pcweb',
					app:121
			},
			dataType:"jsonp",
			success:function(data){

				var ind=data.data.song_list[that.index].song_id;

				//默认  第一首歌
				that.Mulist_mulu(ind);

				that.Prevs(data.data.song_list)
				
				that.Nexts(data.data.song_list)

			}
		})
	},
	Mulist_mulu : function(ind){
		$.ajax({
					url:"http://leboapi.baidu.com/leboapi/song",
					data:{
						type:'getSongFileLink',
						song_id:ind,
						linktype:1,
						args:'baseinfo,pic,album.pic',
						apiver:2,
						from:'lebowebapp',
						terminal:'pcweb',
						app:121
					},
					dataType:"jsonp",
					success:function(data){
						var id=data.data.song.song_title;
						var name=data.data.song.artist_name;
						var src=data.data.song.song_pic[0].pi_link;

						$("#footer").find("h3").html(id)
						$("#footer").find("h4").html(name)
						$("#footer").find("img").attr("src",src)
						audio.setAttribute("src",data.data.songfile[0].songfile_link)
					}
		})
	},
	//歌曲目录  渲染
	mulu:function(){
		var that=this;
		var fu=that.mp_gemu;
		var btn=that.mpge_hui;
		$("#list").toggle(function(){
			$(".mapin_bot").css("margin-bottom","360px");
			var num=$(this).parents("#footer").attr("album_id");

			$.ajax({
				url:"http://leboapi.baidu.com/leboapi/album",
				data:{
					type:'getAlbumDetail',
					args:'*,songlist.song.pic',
					album_id:num,
					apiver:2,
					from:'lebowebapp',
					terminal:'pcweb',
					app:121
				},
				dataType:"jsonp",
				success: function(data){
					var fu=that.f_table;
					var data=data.data.song_list;
					console.log(data)
					var str="<ul>";
					$.each(data,function(i,v){
						str+='<li num="'+data[i].song_id+'"><b>'+(i+1)+'</b><span>'+v.song_title+'</span></li>'
					})
					str+="</ul>";

					$(fu).html(str)

					$("#f_table").slideDown()
				}
			})

		},function(){
			console.log("dfs")

			$(this).parents("#footer").find("#f_table").slideUp();

			$(".mapin_bot").css("margin-bottom","60px");
		})
	},
	//直接 点击目录  进行不播放
	Autobo : function(){
		var fu=this.f_table;
		var that=this;
		$(fu).on("click","li",function(){
			var num=$(this).attr("num");
			that.Mulist_mulu(num)
			$("#f_table").slideUp()

		})
	}
}

$.fn.Audios=function(opt){
	new Audios(opt)
}