let timer1=null;
let timer2=null;
let currentIndex=0;
let currentIndex2=0;
let aImgs=document.getElementsByClassName("aImg");
let imgBtns=document.getElementById("selectBox").children;
let cityImgs=document.getElementsByClassName("cityImg");
let cityBtns=document.getElementById("citySelectBox").children;

$(function($) {

    //自动播放
    autoPlay();
    autoPlay1();
    //鼠标滑入停止播放
    $("#banner").mouseenter(function () {
        stopPlay();
    });

    //鼠标离开继续播放
    $("#banner").mouseleave(function () {
        autoPlay();
    });
    //点击按钮向前或向后
    $("#preBtn").click(function () {
        currentIndex-=1;
        if(currentIndex<0){
            currentIndex=4
        }
        for(let i=0;i<aImgs.length;i++){
            aImgs[i].style.opacity="0";
            imgBtns[i].style.background="gray";
        }
        aImgs[currentIndex].style.opacity="1";
        imgBtns[currentIndex].style.background="pink";
    });
    $("#nextBtn").click(function () {
        currentIndex+=1;
        if(currentIndex>4){
            currentIndex=0
        }
        for(let i=0;i<aImgs.length;i++){
            aImgs[i].style.opacity="0";
            imgBtns[i].style.background="gray";
        }
        aImgs[currentIndex].style.opacity="1";
        imgBtns[currentIndex].style.background="pink";
    });
    //给下面的Li添加颜色及事件
    $("#selectBox>li").css("background","gray");
    $("#selectBox>li:eq(currentIndex)").css("background","");
    for(let i=0;i<imgBtns.length;i++){
        imgBtns[i].style.background="gray";
        imgBtns[i].onmouseover=function(){
            currentIndex=i;
            for(let i=0;i<aImgs.length;i++){
                aImgs[i].style.opacity="0";
                imgBtns[i].style.background="gray";
            }
            aImgs[i].style.opacity="1";
            imgBtns[i].style.background="pink";
        }
    }
    imgBtns[currentIndex].style.background="pink";
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

//页面失去焦点时停止播放
document.body.onblur=function () {
    stopPlay();
    stopPlay2();
    changStop()
};
//页面获得焦点时继续播放
document.body.onfocus=function () {
    autoPlay();
    autoPlay1();
    changeImg()
};

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
function autoPlay(){
    timer1=setInterval(()=>{
        let outIndex=currentIndex;
        currentIndex++;
        if(currentIndex>4){
            currentIndex=0
        }
        showImg(outIndex,currentIndex)
    },4000)
}
function showImg(outIndex,inIndex){
    //1、改图片
    if(outIndex==inIndex){
        return
    }
    fadeInOut(aImgs[outIndex],1000,aImgs[inIndex]);
    // 2、改Li
    for(let i=0;i<imgBtns.length;i++){
        imgBtns[i].style.background="gray";
    }
    imgBtns[currentIndex].style.background="pink";
}
function stopPlay(){
    window.clearInterval(timer1)
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