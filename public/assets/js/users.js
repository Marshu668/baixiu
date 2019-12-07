// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {   
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
	var formData = $(this).serialize();
	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload() 
		},
		error: function () {
			alert('用户添加失败')
		}
	})
	// 阻止表单的默认提交行为
	return false;
});
// 当用户选择文件的时候
$("#modifyBox").on('change','#avatar',function(){
    var formData = new FormData()
    formData.append('avatar',this.files[0])
    $.ajax({
        url:'/upload',
        type:'post',
        data:formData,
        processData:false,
        contentType:false,
        success:function(resp){
            // 实现头像预览功能
            $("#preview").attr('src',resp[0].avatar)
            $("#hiddenAvatar").val(resp[0].avatar)
        }
    })
});
// 向服务器端发送请求 索要用户列表数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(resp){
        var html = template('userTpl',{data:resp})
        $("#userBox").html(html)
    }
});
// 通过事件委托方式为编译按钮一俺家点击事件
$('#userBox').on('click','.edit',function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(resp){
            var html = template('modifyTpl',resp)
            // console.log(html); 
            $("#modifyBox").html(html)
        }
    })
});
// 为修改表单添加表单提交事件
$("#modifyBox").on('submit','#modifyForm',function(){
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/users/'+ id,
        data:formData,
        success:function (resp){
            location.reload()           
        }
    })
    return false
});
// 删除按钮
$("#userBox").on('click','.delete',function(){
    if(confirm('真的要删除用户嘛?')){
        var id = $(this).attr('data-id')
        // alert(id)
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(){
                location.reload()
            }
        })
    }
});
// 当全选按钮发生改变
$('#selectAll').on('change',function(){
    var status = $(this).prop('checked')

    if(status){
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
    $('#userBox').find('input').prop('checked',status)
});
// 复选框状态发生改变
$("#userBox").on('change','.userStatus',function(){
    // 所有用户都是选中的
    var inputs = $('#userBox').find('input');

    if (inputs.length == inputs.filter(':checked').length){
        $('#selectAll').prop('checked',true)
    }else{
        $('#selectAll').prop('checked',false)
    }

    if(inputs.filter(':checked').length > 1){
        $('#deleteMany').show()
    }else{
        $('#deleteMany').hide()
    }
});
// 批量删除
$("#deleteMany").on('click',function(){
    var ids = []
    var checkedUser = $("#userBox").find('input').filter(':checked')
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'))
    })
    if(confirm('批量删除嘛?')){
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success:function(){
                location.reload()
            }
        })
    }
});


