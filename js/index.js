$(function() {
	$("#search_button").button({
		icons: {
			primary: "ui-icon-search ",
		}
	});

	



//对话框模块

	$("#reg").dialog({
		title: "知问注册",
		buttons: {
			"提交": function() {
				$(this).submit();
			},
			"取消": function() {
				$(this).dialog("close");
			}
		},
		position: "center",
		width: 300,
		height: 400,

		//dialog弹出时的特效
		show: true,          //淡入
		hide: true,          //淡出
		//draggable: false,  //不可移动
		resizable: false,    //不可调整大小 
		modal: true,         //遮罩住对话框后面的部分  使不可操作
		closeText: "关闭",

		autoOpen: false,    //初始化  但不显示出来
	}).buttonset().validate({           //.buttonset()  按钮连在一起   //验证插件validate.js

		submitHandler: function(form) {
			alert("验证成功，准备提交中...")
		},

		rules: {
			user: {
				required: true,
				rangelength: [3,12]
			},
			pass: {
				required: true,
				minlength: 6,
			},
			email : {
				required : true,
				email : true
			},
		},
		messages: {
			users: {
				required: "账号不能为空！",
				rangelength: jQuery.format("账号长度必须在{0}-{1}之间！")
			},
			pass: {
				required: "密码不能为空！",
				minlength: jQuery.format("密码长度不能小于{0}位！"),
			},
			email : {
				required : '邮箱不得为空！',
				minlength : '请输入正确的邮箱地址！',
			},	
		},

		highlight : function (element, errorClass) {
			$(element).css('border', '1px solid #630');
		},
		
		unhighlight : function (element, errorClass) {
			$(element).css('border', '1px solid #ccc');
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},
	});

	$("#reg_a").click(function() {
		$("#reg").dialog("open");     
	});                         

	
	        


	        
//日历UI模块

	$("#birthday").datepicker({
		dateFormat: "yy-mm-dd",
		monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		firstDay: 1,
		changeMonth: true,
		changeYear: true,
		/*
		showOn: "button",
		buttonImage: "image/calendar.gif",
		buttonImageOnly: true,
		*/
		/*
		showButtonPanel: true,
		closeText: "关闭",
		currentText: "今天",
		*/
		prevText: "上个月",
		nextText: "下个月",
		
		yearRange: "1950:2050",
		//minDate : -10000,    //当前日期之前10000天都能选择
		maxDate : 0,         //当前日期之后都不能选择
		hideIfNoPrevNext: true,   //如果没有之前或之后没有月份了就隐藏按钮
		showAnim : false,
		duration : 300,
	});   







//email自动补全
	
	$("#email").autocomplete({
		delay: 0,
		autoFocus: true,		
		source: function(request,response) {
			var hosts = ["qq.com","163.com","126.com","sina.com","gmail.com","hotmail.com","yahoo.com.cn"];
				term = request.term,     //获取用户输入的内容
				name = term,             //邮箱的用户名(即@之前的部分)
				host = "",               //邮箱的域名
				ix = term.indexOf("@"),  //@的位置
				result = [];             //最终呈现的邮箱列表

			result.push(term); 

			//当有@时，重新分配用户名和域名
			if(ix > -1) {               
				name = term.slice(0,ix);
				host = term.slice(ix + 1);
			} 

			if(name) {
				/*如果用户已经输入@和后面的域名，
				那么就找到相关的域名提示，比如bnbbs@1，就提示bnbbs@163.com
				如果用户还没有输入@或后面的域名，
				那么就把所有的域名都提示出来*/

				var findedHosts = (host ? $.grep(hosts, function (value, index) {
						return value.indexOf(host) > -1
					}) : hosts),
					findedResult = $.map(findedHosts, function (value, index) {
					return name + '@' + value;
				});
				
				result = result.concat(findedResult);
			}
			response(result);
		}			
	});  


	
})