$(function($) {
	partNewsGo();
	$(".partNewsImg").mouseover(function(){
		partNewsStop()
	})
	
	$(".partNewsImg").mouseout(function(){
		partNewsGo();
	})
	$(".pre").click(function(){
		distant+=510;
		if(distant>0){
			distant=-510*3;
		}
		$(".box").animate({left:distant},250)
	})
	$(".next").click(function(){
		distant-=510;
		if(distant<-510*3){
			distant=0;
		}
		$(".box").animate({left:distant},250)
	})

});
document.body.onblur=function(){
		partNewsStop()
}
document.body.onfocus=function(){
		partNewsGo()
}
let timer=null;
let distant=0;
function partNewsGo(){
	timer=setInterval(()=>{
		distant-=510;
		if(distant<-510*3){
			distant=0;
			$(".box").css("left","0px")
		}else{
			$(".box").animate({left:distant},1000)
		}

	},3000)
};
function partNewsStop(){
	window.clearInterval(timer);
	timer=null;
}

