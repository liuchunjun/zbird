$(function () {
    //获取用户信息
    let userStr=getCookie("userId");
    console.log(userStr)
    if(userStr!=null && userStr!=""){
        //查询数据库中购物车中有无数据
        $.get("php/getShoppingCart.php",{vipName:userStr},show,"json")
    }else{
        $(".carContentUnCheck").css("display","block");
    }


    function show(data){
        console.log(data)
        if(data.length>0){
            $(".carLst").css("display","block");
            let sum=0;
            let htmlStr="";
            for (let i=0;i<data.length;i++){
                htmlStr+=`<div style="border-top: 1px solid #666;">
	                      <div style="float: left;width: 335px;line-height: 97px;height: 97px;">
	                        <img src="${data[i].goodsImg}" width="60" height="60" />
	                        <span>${data[i].goodsName}</span>
	                      </div>
	                      <div style="float: left;width: 184px;line-height: 97px;height: 97px;"></div>
	                      <div style="float: left;width: 184px;line-height: 97px;height: 97px;"></div>
	                      <div style="float: left;width: 80px;line-height: 97px;height: 97px;">${data[i].beiyong12}</div>
	                      <div style="float: left;width: 160px;line-height: 97px;height: 97px;text-decoration: line-through;color:#666;">￥ ${data[i].beiyong13}</div>
	                      <div style="float: left;width: 160px;line-height: 97px;height: 97px;">￥ ${data[i].goodsPrice}</div>
	                      <div style="float: left;width: 77px;line-height: 97px;height: 97px;"><a href="javascript:;" class="deleteGoodsBtn" index=${i}>删除</a></div>
	                  </div>`
                sum+=parseFloat(data[i].goodsPrice);
            }
            $(".carLstInfo").html(htmlStr);
            $(".sellsMoney").html("￥"+sum);
            $(".billsMoney").html("￥"+sum);
            //从数据库中删除商品
            $(".deleteGoodsBtn").click(function () {
                let index=$(this).attr("index");
                if(confirm("确认删除该商品吗？")){
                    this.parentNode.parentNode.remove();
                    $.get("php/deleteGoods.php",{vipName:userStr,goodsId:data[index].goodsId},function () {
                        console.log("this goods is already deleted from your count")
                    })
                }
            })

            //结算按钮

        }else{
            $(".carContentUser").css("display","block");
        }
    }

})