// 向服务器端发送请求 获取文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(resp){
        // console.log(resp);
        var html = template('categoryTpl',{data:resp})
        $('#category').html(html)      
    }
});

$('#feature').on('change',function(){
    var file = this.files[0]
    var formData = new FormData()
    formData.append('cover',file)
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData:false,
        // 告诉$.ajax方法不要设置参数类型
        contentType:false,
        success:function(resp){
            // console.log(resp);
            $("#thumbnail").val(resp[0].cover)
        }
    })
});

$("#addForm").on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
            location.href = '/admin/posts.html'
        }
    })
    return false
});
