var table1 = $("#adminList").dataTable({
	"sAjaxSource" : "api/PageServlet",
	"fnServerData" : function(sSource, aoData, fnCallback) { // 向服务器发送请求
		// 1.sSource -- 请求路径 2.aoData -- dataTable封装参数 3.回调函数
		alert(JSON.stringify(aoData));
		$.ajax({
			"type" : 'post',
			"url" : sSource,
			"dataType" : "json",
			"data" : aoData,
			"success" : function(data) {
				console.log(data);
				fnCallback(data);
			},
			error : function(data) {
			}
		});
	},
	/* "language":{url:"../js/zh_CN.txt"}, */
	"bServerSide" : true,
	"aoColumns" : [ {
		mDataProp : "username",
		sTitle : "用户名",

	}, {
		mDataProp : "sex",
		sTitle : "性别"
	}, {
		mDataProp : "phone",
		sTitle : "手机号码"
	}, {
		mDataProp : "email",
		sTitle : "邮件"
	}, {
		mDataProp : "city",
		sTitle : "城市"
	}, {
		mDataProp : "regTime",
		sTitle : "注册时间"
	}, {
		mDataProp : "msg",
		sTitle : "备注",
		render : function(phone, dis, obj) {

			var first = phone.substring(0, 1);
			var last = phone.substring(phone.length - 1, phone.length);
			return first + "***" + last;
			return "<span style = 'color:red'>" + phone + "</span>";

			return phone;
		}

	},

	]

});

/* 用户-添加 */
function member_add(title, url, w, h) {
	layer_show(title, url, w, h);
}
/* 用户-查看 */
function member_show(title, url, id, w, h) {
	layer_show(title, url, w, h);
}
/*
 * $(()=>{ $.ajax({ type:"post", usrl:"api/SelectUserServlet", dataType:"json",
 * success:function(data){ console.log(data); var tr =``;
 * $.each(data.list,function(index,obj){ tr+=` <tr class="text-c"> <td><input
 * type="checkbox" value="1" name=""></td> <td>${obj.id}</td> <td><u
 * style="cursor:pointer" class="text-primary"
 * onclick="member_show('${obj.username}','member-show.html','10001','360','400')">${obj.username}</u></td>
 * <td>${obj.sex}</td> <td>${obj.phone}</td> <td>${obj.email}</td>
 * <td class="text-l">${obj.city}</td> <td>2014-6-11 11:11:42</td>
 * <td class="td-status"><span class="label label-success radius">已启用</span></td>
 * <td class="td-manage"><a style="text-decoration:none"
 * onClick="member_stop(this,'10001')" href="javascript:;" title="停用"><i
 * class="Hui-iconfont">&#xe631;</i></a> <a title="编辑" href="javascript:;"
 * onclick="member_edit('编辑','member-add.html','4','','510')" class="ml-5"
 * style="text-decoration:none"><i class="Hui-iconfont">&#xe6df;</i></a> <a
 * style="text-decoration:none" class="ml-5"
 * onClick="change_password('修改密码','change-password.html','10001','600','270')"
 * href="javascript:;" title="修改密码"><i class="Hui-iconfont">&#xe63f;</i></a>
 * <a title="删除" href="javascript:;" onclick="member_del(this,'1')" class="ml-5"
 * style="text-decoration:none"> <i class="Hui-iconfont">&#xe6e2;</i></a></td>
 * </tr> ` }) $("#adduser").html(tr); } }) })
 */