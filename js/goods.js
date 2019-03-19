$(function(){
    //放大镜效果
    $(".mImgs").each(function(i){
        $(this).attr("index",i);
    })

    $(".mImgs").hover(function () {
        let imgPath=$(this).attr("src");
        console.log(imgPath);
        $(".bgBox").css({
            backgroundImage:`url(${imgPath})`,
            backgroundSize:"800px 800px",
            backgroundRepeat:"no-repeat"
        })
        let index=$(this).index();
        $(".imgs").removeClass("on");
        $(".imgs").eq(index).attr("src",imgPath);
        $(".imgs").eq(index).addClass("on");
        $(".mImgs").removeClass("on");
        $(this).addClass("on")
    });

    $(".picBox").hover(function () {
        $(".bgBox").css("display","block")
    },function () {
        $(".bgBox").css("display","none")
    })

    $(".picBox").mousemove(function(e){

            let left1=e.clientX-$(".pic")[0].offsetLeft-$(".picBox")[0].offsetLeft-$(".mask")[0].offsetWidth/2;
            let top1=e.pageY-$(".picBox")[0].offsetTop-$(".mask")[0].offsetHeight-$(".mask")[0].offsetHeight/2;

            if(left1<=0){
                left1=0
            }else if(left1>=$(".picBox")[0].offsetWidth-$(".mask")[0].offsetWidth){
                left1=$(".picBox")[0].offsetWidth-$(".mask")[0].offsetWidth
            }

            if(top1<=0){
                top1=0
            }else if(top1>=$(".picBox")[0].offsetHeight-$(".mask")[0].offsetHeight){
                top1=$(".picBox")[0].offsetHeight-$(".mask")[0].offsetHeight
            }
            $(".mask").css({left:left1,top:top1});
            $(".bgBox").css({backgroundPositionX:-left1*2,backgroundPositionY: -top1*2})

    })

    //前进和后退按钮
    $(".preBtn").click(function () {
        $(".morePic").animate({left:20},1000);
        $(this).css("display","none");
        $(".nextBtn").css("display","block")
    });
    $(".nextBtn").click(function () {
        let left1=parseFloat($(".morePic").css("left"));
        console.log(left1)
        left1-=302;
        // $(".morePic").css("left",left1);
        $(".morePic").animate({left:left1},1000);
        $(this).css("display","none");
        $(".preBtn").css("display","block")
    })





    let goTimer=null;
    let goCurrentIndex=0;
    go();
    let proA=$(".det_tab_nav").children();
    proA.hover(function () {
        stop();
        let i=$(this).attr("index");
        $(".det_tab_nav>a").removeClass("on");
        $(this).addClass("on");
        $(".proShow").removeClass("active");
        $(".proShow").eq(i).addClass("active")
    });
    proA.mouseout(function () {
        go();
    });
    $(".proShow").mouseenter(function () {
        stop();
    });
    $(".proShow").mouseleave(function () {
        go();
    });

    function go(){
        goTimer=setInterval(()=>{
            goCurrentIndex++;
            if(goCurrentIndex>2){
                goCurrentIndex=0
            }
            $(".det_tab_nav>a").removeClass("on");
            $(".det_tab_nav>a").eq(goCurrentIndex).addClass("on");
            $(".proShow").removeClass("active");
            $(".proShow").eq(goCurrentIndex).addClass("active")
        },1500)
    }
    function stop(){
        window.clearInterval(goTimer);
    }



})

$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
        console.log(r)
    }

    let id = getUrlParam("goodsId")

    function showlist(objs){
        $(".goodsName").html(objs.goodsName);
        $(".mImgs").eq(0).attr("src",objs.goodsImg);
        $(".mImgs").eq(1).attr("src",objs.beiyong4);
        $(".mImgs").eq(2).attr("src",objs.beiyong5);
        $(".mImgs").eq(3).attr("src",objs.beiyong6);
        $(".mImgs").eq(4).attr("src",objs.beiyong7);
        $(".mImgs").eq(5).attr("src",objs.beiyong8);
        $(".mImgs").eq(6).attr("src",objs.beiyong9);
        $(".mImgs").eq(7).attr("src",objs.beiyong10);
        $(".imgs").eq(0).attr("src",objs.goodsImg);
        $(".price").html("￥"+objs.goodsPrice);
        $(".sell").html(objs.beiyong2);
        $(".pj").html(objs.beiyong3);

    }

    $.get("php/getGoodsInfo.php",{goodsId:id},showlist,"json");

})

window.onscroll=function () {
    let scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
    console.log(scrollTop);
    if(scrollTop>=755){
        $(".fix_tab").css({
            position:"fixed",
            top:0,
            background:"rgba(5,5,5,.1)"
        })
    }else{
        $(".fix_tab").css({
            position:"relative",
            background:"none"
        })
    }
}

