$(function () {
    let isRight=false;
    $("#userphone").val("请输入手机号");
    $("#checkCode").val("6位验证码");
    $(".userPassUp").val("6-20位大小写字母，数字及'-'、'_'组合");
    $(".confirmPass").val("请再次输入密码");

    $("#userphone").focusin(function () {
        if($(this).val()=='请输入手机号'){
            $(this).val('')
        }
    });
    $("#userphone").focusout(function () {
        let oPhoneRe=/^1[0-9]{10}$/;
        if(oPhoneRe.test($(this).val())){
            $(".phoneTip").html('√');
            isRight=true;
            $.post("php/checkUser.php",{"userId":$("#userphone").val()},function(data){
                if(data==0){
                    $(".phoneTip").html('该用户已存在');
                }else if(data==1){
                    $(".phoneTip").html('可使用');
                }
            })
        }else{
            $(".phoneTip").html('手机号码为11位数字');
            isRight=false;
            return
        }
    });
    $("#userphone").focusout(function () {


    })
    //获得随机验证码
    $("#getCode").click(function(){
        $(this).val(randNum());
    });

    //验证随机码是否正确
    $("#checkCode").focusin(function () {
        if($(this).val()=='6位验证码'){
            $(this).val('')
        }
    });
    $("#checkCode").focusout(function () {
        if($(this).val()==$("#getCode").val()){
            $(".codeTip").html('√');
            isRight=true;
        }else{
            $(".codeTip").html('验证码错误');
            isRight=false;
            return
        }
    });
    //6-20位大小写字母，数字及'-'、'_'组合
    $(".userPassUp").focusin(function () {
        $(this).val("");
        $(this).css("display","none")
    });
    $("#userPass").focusout(function () {
        if($(this).val().length<6 ||$(this).val().length>20){
            $(".passTip").html('密码格式有误');
            isRight=false;
            return
        }
        let oMa=/\w/;
        if($(this).val().indexOf("-")<0 && $(this).val().indexOf("_")<0){
            isRight=false;
            $(".passTip").html('未包含特殊字符');
            return
        }else{
            $(".passTip").html('');
            isRight=true;
        }

        if(oMa.test($(this).val())){
            isRight=true;
            $(".passTip").html('√');
        }else{
            $(".passTip").html('未包含数字字母下划线');
            isRight=false;
            return
        }
    });

    //验证重复密码
    $(".confirmPass").focusin(function () {
        if($(this).val()=='请再次输入密码'){
            $(this).val('')
        }
    });
    $(".confirmPass").focusout(function () {
        if($(this).val()!=$("#userPass").val()){
            $(".passAgainTip").html("密码不一致")
            isRight=false;
        }else{
            isRight=true;
        }
    });

    //发送请求
    $("#regBtn").click(function(){
        if(isRight==true && $(".autoInput").attr("checked")=="checked"){
            console.log("ok")
        }else{
            $(".regTip").html("检查您的输入格式或勾选注册协议")
        }
    })

    // 注册协议
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

    //开始注册
    $("#regBtn").click(function(){
        if(isRight){
            $.post('php/reg.php?=1',
            {"userId":$("#userphone").val(),
            "userPass":$("#userPass").val()
        },function(data){
            if(data==1){
                confirm("注册成功")
                $(".login").css("display","none");
                $(".regHidden").css("display","block")
            }else{
                $(".regTip").html("注册失败")
            }
        })
        }
    })

})
    //随机验证码
    function randNum() {
        let str='';
        for(let i=0;i<6;i++){
            str+=parseInt(Math.random()*16).toString(16);
        }
        return str;
    }