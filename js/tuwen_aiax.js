var Tuwens=function(opt){
	this.opt=opt.Name;
	this.json=opt.Json;
	this.init()
}

	Tuwens.prototype={
		init : function(){
			this.tuwenxun()
		},
		tuwenxun : function(){
			var idName=this.opt.mp_cont;
			var obj=this.json.mp_json;
		
			var len=Math.ceil(obj.length/3)*3;
			var que=obj.length%3;
			var section='';
			for(var i=0;i<len;i++){

				var title=obj[i].song_title?obj[i].song_title:obj[i].album_title;
				var pic=obj[i].song_pic?obj[i].song_pic:obj[i].album_pic;

					if(i%3==0){
						section+='<ul>'
					}

					if(obj[i]){
						section+='<li>'+
								'<dl>'+
									'<dt>'+
										'<img src="'+pic[0].pi_link+'">'+
										'</dt>'+
									'<dd>'+title+'</dd>'+
									'<dd>#音乐</dd>'+
								'</dl>'+
							'</li>';
					}
					else{
						section+='<li></li>';
					}
					
					if(i%3==2){
						section+='</ul>';
					}

				}

			$(idName).html(section);		
		}
	}

$.fn.Tuwens=function(opt){
	new Tuwens(opt)
}