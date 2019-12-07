// 当添加分类表单发生提交行为时
$("#addCatagory").on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload()
        }
    })
    return false
});
// 发送ajax 请求 向服务器端所有分类列表数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(resp){
        var html = template('categoryListTpl',{data:resp})
        $("#categoryBox").html(html)
    }
});
// 为编辑按钮添加点击事件
$("#categoryBox").on('click','.edit',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(resp){
            // console.log(resp);  
            var html = template('modifyCategoryTpl',resp)          
            $("#formBox").html(html)
        }
    })
});
// 当修改分类数据表单发生提交时
$("#formBox").on('submit','#modifyCatagory',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/categories/'+ id,
        data: formData,
        success:function(){
            location.reload()
        }
    })
    return false
});
// 为删除按钮添加点击事件
$("#categoryBox").on('click','.delete',function(){
    if(confirm('确定删除嘛?')){
        var id = $(this).attr("data-id")
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
                location.reload()
            }
        })
    }
});



