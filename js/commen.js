$(function () {
    // 固定区域二维码显示、消失
    $("#share").mouseover(function(){
        console.log("111")
        $("#gzgz").css("display","block")
    });
    $("#share").mouseout(function(){
        $("#gzgz").css("display","none")
    });
    $("#gzgz").mouseover(function () {
        $("#gzgz").css("display","block")
    });
    $("#gzgz").mouseout(function () {
        $("#gzgz").css("display","none")
    });

    //导航划过显示指定块
    $(".navList").mouseenter(function(){
        let index=$(this).attr("index");
        $(".navShow").eq(index).css("display","block")
    });
    $(".navList").mouseleave(function () {
        $(".navShow").css("display","none")
    })
    $(".navShow").mouseenter(function () {
        $(".navShow").css("display","block");
    })
    $(".navShow").mouseleave(function () {
        $(".navShow").css("display","none");
    })


    //小banner
    let dist=0;
    $("#nextLi").click(function () {
        $("#preLi").css("background-position","0 0");
        dist=dist-274;
        console.log(dist);
        if(dist<=-274*4){
            dist=-274*4;
            $("#nextLi").css("background-position","-37px -51px");
            $("#slideUl").animate({left:+dist+"px"},"slow")
            console.log(dist);
            return
        }
        $("#slideUl").animate({left:+dist+"px"},"slow")
    });
    $("#preLi").click(function () {
        $("#nextLi").css("background-position","0px -51px");
        dist+=274;
        console.log(dist);
        if(dist>=0){
            dist=0;
            console.log(dist);
            $("#preLi").css("background-position","-37px 0");
            $("#slideUl").animate({left:+dist+"px"},"slow")
            return
        }
        $("#slideUl").animate({left:+dist+"px"},"slow");
    });

    //页面底部滚动链接
    scrollLinkGo();



})
let upp=0;
function scrollLinkGo(){
    setInterval(()=>{
        upp-=24;
        if(upp<-24*2){
            upp=0;
            $(".scrollAlink").css("top","0")
        }
        $(".scrollAlink").animate({"top":upp},"slow")
    },2000)
}