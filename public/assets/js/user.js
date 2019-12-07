// 绑定submit事件,当表单发生提交行为时
$('#userForm').on('submit',function(){
    //  获取到用户在表单输入到内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户端的请求
    $.ajax({
        type:'post',
        url:'/users',
        data:formData,
        success:function(){
            location.reload();
        },
        error:function(){
            alert('用户添加失败')
        }
    })
    // 阻止表单的默认提交行为
    return false;
})

// 当用户选择文件时,用户选择到到文件
// $('#avatar').on('change',function(){
   
// })
$('#modifyBox').on('change',"#avatar",function(){
     // this.files[0]
     var formData = new FormData();
     formData.append('avatar',this.files[0]);
     $.ajax({
         type:'post',
         url:'/upload',
         data:formData,
         // 告诉$.ajax方法不要解析请求参数
         processData:false,
         // 告诉$.ajax方法不要设置请求参数的类型
         contentType:false,
         success:function(response){
             console.log(response);
             // 实现图片预览功能
             // 给用户看的,将图片显示在页面当中
             $('#preview').attr('src',response[0].avatar);
             // 提交给服务器的,将图片地址存储在隐藏域当中
             $('#hiddenAvatar').val(response[0].avatar)
             
         }
 
 
     })
})

// 实现用户列表展示
// 向服务器发送请求,索要用户列表数据
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        console.log(response);
        // 使用模版引擎将数据和html字符串进行拼接
        var html = template('userTpl',{
            data:response
        });
        console.log(html);
        // 将拼接好的字符串显示在页面中
        $('#userBox').html(html);
    }
})


// 编辑功能
$('#userBox').on('click','.edit',function(){
    // 获取被点击用户的id值
    var id = $(this).attr('data-id');
    // alert(id);
    // 根据id获取用户的详细信息
    $.ajax({
        type:'get',
        url:'/users/' + id,
        success:function(response){
            var html = template('modifyTpl',response);
            console.log(html); 
            $('#modifyBox').html(html);
            
        }
    })
})

// 为修改表单添加表单提交事件
// .serialize() 方法创建以标准 URL 编码表示的文本字符串。它的操作对象是代表表单元素集合的 jQuery 对象。
$('#modifyBox').on('submit','#modifyForm',function(){
    // 获取用户在表单中输入的内容
    var formData =  $(this).serialize();
    // 获取要修改的哪个用户的id值
    var id = $(this).attr('data-id');
    // console.log(formData);
    // 发送请求 修改用户信息
    $.ajax({
        type:'put',
        url:'/users/' + id,
        data:formData,
        success:function(response){
            // 修改用户信息 成功,重新加载页面
            location.reload();
        }
    })
    
    //  阻止表单默认提交
    return false;
})

// 当删除按钮被点击时
$('#userBox').on('click','.delete',function(){
    // 如果管理员确认要删除用户
    if(confirm('你真的要删除用户吗?')){
        var id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            type:'delete',
            url:'/users/' + id,
            success:function(){
                location.reload();
            }
        })
    };
});

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 当全选按钮状态发生改变时
selectAll.on('change' ,function(){
    // 获取到全选按钮当前到状态 
    var status = $(this).prop('checked');

    if(status){
        // 显示批量删除按钮
        deleteMany.show();
    }else{
        // 隐藏批量删除按钮
        deleteMany.hide();
    }

    // 获取到所有到用户
    $('#userBox').find('input').prop('checked',status);
});
// 当用户前面当复选框状态发生改变时
$('#userBox').on('change','.userStatus',function(){
     var inputs = $('#userBox').find('input');
    //  在所有用户中过滤出选中用户inputs.filter(':checked')
     if(inputs.length == inputs.filter(':checked').length){
        //    alert('所有的用户都是选中的')
        selectAll.prop('checked',true)
     }else{
        //  alert('不是所有用户都是选中的')
        selectAll.prop('checked',false)
     }
     //如果选中的复选框的数量大于0,就说明有选中的复选框
     if(inputs.filter(':checked').length > 0){
         deleteMany.show();
     }else{
         deleteMany.hide();
     }
})

// 为批量删除的按钮添加点击事件
deleteMany.on('click', function(){
     var ids  = [];
    //  获取选中的用户
    var checkedUser= $('#userBox').find('input').filter(':checked');
    // 循环复选框在复选框元素的身上获取data-id属性的值
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    // console.log(ids);
    if(confirm('你真的要进行删除吗')){
        $.ajax({
            type:'delete',
            url:'/users/' + ids.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
    
})
