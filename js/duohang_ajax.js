var Ajaxs=function(opt){
	this.opt=opt.Name;
	this.json=opt.Json;
	this.init()
}

	Ajaxs.prototype={
		init : function(){
			this.duohang()
		},
		duohang : function(){
			var idName=this.opt.mp_cont;
			var obj=this.json.mp_json;

			
			var len=Math.ceil(obj.length/4)*4;
			var que=obj.length%4;
			var section='';
				for(var i=0;i<len;i++){
					if(i%4==0){
						section+='<ul>'
					}

					if(obj[i]){
						section+='<li>'+obj[i].tag_name+'</li>';
					}
					else{
						section+='<li></li>';
					}
					
					if(i%4==3){
						section+='</ul>';
					}

				}

			$(idName).html(section);		
		}
	}

$.fn.Ajaxs=function(opt){
	new Ajaxs(opt)
}