$(function () {
    // 获取会员信息
    let userStr=getCookie("userId");


    function show(data){

         if(data.length>0){
             $("#shopCounts").html(data.length);
             let sum=0;
             let htmlStr="<div>";
             for(let i=0;i<data.length;i++){
                 sum+=parseFloat(data[i].goodsPrice);
                 htmlStr+=`
                    <div style="clear: both;">
                      <img src="${data[i].goodsImg}" width="50" height="50" alt="" style="float: left;">
                      <div style="float: left;">
                        <div style="height: 30px;text-indent: 14px;">${data[i].goodsName}</div>
                        <div style="height: 30px;">￥ ${data[i].goodsPrice}</div>        
                      </div>
                    </div> `
             }
             htmlStr+=`<div style="clear: both;"><span style="float: left;margin-left: 10px;">合计<i>￥${sum}</i></span><span style="float: right;cursor:pointer;margin-right: 10px;">结算</span></div></div>`;
             $("#hiddenShopCar").html(htmlStr)
         }
    }
    //获取购物车信息
    $.get("php/getShoppingCart.php",{vipName:userStr},show,"json")

    if(userStr!=null && userStr!=""){
        $(".welcome li").eq(0).html("MemberOfZbird，您好！");
        $(".welcome li").eq(1).html("您是<span style='color:#ff8a81;'>普通</span>会员");
        $(".welcome li").eq(2).html("<a href='javascript:;' class='backBtn'>退出登录</a>");
        $(".backBtn").click(function(){
            addCookie("userId","",-1);
            location.href="index.html"
        })
    }
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
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
    console.log(r)
}

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

