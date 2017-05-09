var Gemus=function(opt){
	this.opt=opt.Name;
	this.json=opt.Json;
	this.init()
}

	Gemus.prototype={
		init : function(){
			this.tuwenxun()
		},
		tuwenxun : function(){
			var idName=this.opt.mp_cont;
			var obj=this.json.mp_json;
			var len=Math.ceil(obj.length/3);
			var que=obj.length%3;
			var section='';

			$.each(obj,function(i,v){
				var ren=parseInt(v.statistics.play_count/10000);
				
				section+='<section>'+
							'<dl>'+
								'<dt><img id="mpge_img'+i+'" class="mpge_img" src="'+v.album_pic[0].pi_link+'" ><img src="http://static.lebo.baidu.com/st/i/H51z9oS0.png" id="mpge_bo'+i+'" class="mpge_bo" album_id="'+v.album_id+'"></dt>'+
								'<dd>'+
									'<h3>'+v.album_title+'</h3>'+
									'<h4>'+v.artist_name+'</h4>'+
									'<p><span class="mpge_red">'+v.tag[0].tag_name+'</span><span class="mpge_hui" album_id="'+v.album_id+'">'+v.tag[1].tag_name+'</span><span class="mpge_ren"><i></i>'+ren+'  万</span></p>'+
								'</dd>'+
							'</dl>'+
						'</section>';
			})

			$(idName).html(section);		
		}
	}

$.fn.Gemus=function(opt){
	new Gemus(opt)
}