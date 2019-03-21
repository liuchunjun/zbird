
//大轮播图
$(function(){
    var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal', // 水平切换选项

            loop: true, // 循环模式选项

            autoplay:true,//自动播放

            effect : 'fade',//淡入

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
        },
        })
        //鼠标滑过停止播放
        mySwiper.el.onmouseover = function(){
          mySwiper.autoplay.stop();
        }
        mySwiper.el.onmouseout = function(){
          mySwiper.autoplay.start();
        }
        //鼠标滑过pagination控制swiper切换
        for(i=0;i<mySwiper.pagination.bullets.length;i++){
          mySwiper.pagination.bullets[i].index=i
          mySwiper.pagination.bullets[i].onmouseover=function(){
            mySwiper.slideTo(this.index);
          };
        }
        //如果你开启了clickable，还可以这样  
        for(i=0;i<mySwiper.pagination.bullets.length;i++){
          mySwiper.pagination.bullets[i].onmouseover=function(){
            this.click();
          };
        } 
})





let timer2=null;
let currentIndex2=0;
let cityImgs=document.getElementsByClassName("cityImg");
let cityBtns=document.getElementById("citySelectBox").children;

$(function($) {
   
    //图2轮播按钮
    for(let i=0;i<cityBtns.length;i++){
        cityBtns[i].style.background="gray";
        cityBtns[currentIndex2].style.background="white";
        cityBtns[i].onmouseover=function(){
            stopPlay2();
            currentIndex2=i;
            for(let i=0;i<cityImgs.length;i++){
                cityImgs[i].style.opacity="0";
                cityBtns[i].style.background="gray";
            }
            cityImgs[i].style.opacity="1";
            cityBtns[i].style.background="white";
        };
        cityBtns[i].onmouseout=function(){
            autoPlay1();
        }
    }
    $(".cityImg:eq(0)").css("opacity","1");



    $("#inputTxt").focus(function () {
        $(this)[0].value="";
        $("#sendInfoBtn").html("发送")
    });
    $("#inputTxt").blur(function () {
        $(this)[0].value="免费发送到手机";
        $("#sendInfoBtn").html("")
    });

    go();
    let proA=$("#proNav").children();
    proA.hover(function () {
        stop();
        let i=$(this).attr("index");
        $("#proNav>a").removeClass("show");
        $("#proNav>a").eq(i).addClass("show");
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
    for(let i=0;i<document.getElementsByClassName("list1SectionLi").length;i++){
        document.getElementsByClassName("list1SectionLi")[i].setAttribute("index",i)
    }
    $(".list1SectionLi").hover(function () {
        let index=$(this).attr("index");
        $(".list1SectionLi").css("color"," #333");

        $(this).css("color","#f6827a");
        $(".list2Section").removeClass("active");
        $(".list2Section>li:first-child a").css("color","#f6827a");
        $(".list2Section").eq(index).addClass("active")
    });

    $(".list2Section>li").hover(function () {
        $(".list2Section>li>a").css("color"," #333");
        $(this).children(0).css("color","#f6827a");
    })


    changeImg();




    //图片滑过遮罩效果




});
let goCurrentIndex=0;
let goTimer=null;


function go(){
    goTimer=setInterval(()=>{
        goCurrentIndex++;
        if(goCurrentIndex>4){
            goCurrentIndex=0
        }
        $("#proNav>a").removeClass("show");
        $("#proNav>a").eq(goCurrentIndex).addClass("show");
        $(".proShow").removeClass("active");
        $(".proShow").eq(goCurrentIndex).addClass("active")
    },2000)
}
function stop(){
    window.clearInterval(goTimer);
}


function stopPlay2(){
    window.clearInterval(timer2);
}
function autoPlay1(){
    timer2=setInterval(()=>{
        let outIndex=currentIndex2;
        currentIndex2++;
        if(currentIndex2>3){
            currentIndex2=0
        }
        showImg2(outIndex,currentIndex2)
    },2000)
}
function showImg2(outIndex,inIndex){
    //1、改图片
    if(outIndex==inIndex){
        return
    }
    fadeInOut(cityImgs[outIndex],1000,cityImgs[inIndex]);
    // 2、改Li
    for(let i=0;i<cityBtns.length;i++){
        cityBtns[i].style.background="gray";
    }
    cityBtns[currentIndex2].style.background="white";
}
let changeTimer=null;
function changeImg() {
    let i=0;
    changeTimer=setInterval(()=>{
        let n=i;
        i++;
        if(i>2){
            i=0
        }
        fadeInOut($(".showStageImg")[n],800,$(".showStageImg")[i]);
    },2000)
}
function  changStop() {
    window.clearInterval(changeTimer)
}


