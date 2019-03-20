$(function () {
    $("#userName").val("用户名");
    $("#userPass").val("密码");

    $("#userName").focusin(function () {
        if($(this).val()=="用户名"){
            $(this).val("")
        }
    });
    $("#userPass").focusin(function () {
        if($(this).val()=="密码"){
            $(this).val("")
        }
    });


    let n=-1;
    $(".autoInput").click(function () {
        n++;
        if(n>0){
            n=-1
            $(this).css("background-position-x","1px");
            $(this).attr("checked",false)
        }else{
            $(this).css("background-position-x","-12px")
            $(this).attr("checked",true)
        }
    })


    //开始登陆
    $("#loginBtn").click(function(){
        $.post('php/login.php',
            {"userId":$("#userName").val(),
            "userPass":$("#userPass").val()},function(data){
            if(data==1){
                addCookie("userId",$("#userName").val(),1);
                location.href="index.html";
            }else{
                alert("登陆失败")
            }
        })
    })


})


