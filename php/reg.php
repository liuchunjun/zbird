<?php
    header("Content-type:text/html;charset=utf-8");

    	//1、接收浏览器端的数据
    	$userId=$_POST["userId"];
    	$userPass=$_POST["userPass"];

    	//2、找数据库（先判断用户名有没有，再保存）
    	//1、连接数据库
    	// mysql_connect("数据库服务器的地址","用户名","密码");
    	$conn = mysql_connect("localhost","root","root");

    	//选择数据库
    	mysql_select_db("zbird",$conn);

    	//2、传输数据（执行SQL语句）
    	$sqlstr="insert into vip (userId,userPass)
    						values('$userId','$userPass')";

        $result=mysql_query($sqlstr,$conn);//查询语句的返回值是个表格

    	//3、关闭数据库
         mysql_close($conn);

         if($result==1){
    		//3、响应
         	echo 1; //"注册成功！";
         }else{
    		//3、响应
         	echo 0; //"注册失败！";
    }
?>