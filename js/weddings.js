$(function () {
    $(".dTitle").click(function () {
        $(this).toggleClass("atv")
        $(this).parent().children("dd").toggle()
    })

    // 点击显示更多搜索条件
    $(".hiddenBtn").click(function () {
        $(".moreUl").toggle();
        $(this).css("display","none")

    })
    $(".moreSearchBtn").click(function () {
        $(".moreUl").css("display","none");
        $(".hiddenBtn").css("display","block")
    })

    $(".navListLeft>li").click(function () {
        $(".navListLeft>li").removeClass("on");
        $(this).addClass("on")
    })

    //链接后端获取数据显示商品

    $.post("php/getGoodsList.php",show,"json");

    function show(data){
        let htmlStr="";
        let arr=[];
        for(let i in data){
            if(data[i].goodsType=="婚戒"){
                htmlStr+=`<li>
                        <div class="imgBox">
                            <a href="goods.html?goodsId=${data[i].goodsId}">
                                <img class="imgBoxImg1" src="${data[i].goodsImg}" alt="">
                                <img class="imgBoxImg2" src="${data[i].beiyong1}" alt="">
                            </a>
                        </div>
                        <p class="goodsCntP"><a href="">${data[i].goodsName}</a></p>
                        <p class="goodsCntP sellsPrice">￥<span>${data[i].goodsPrice}</span></p>
                        <p class="goodsCntP">售出<span class="selled">${data[i].beiyong2}</span>评论<span class="comment">${data[i].beiyong3}</span></p>
                      </li>`
            }
        }
        $(".goodsCnt").html(htmlStr)
    }



})
