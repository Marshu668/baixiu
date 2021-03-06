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

// 当管理员选择额文件当时候,触发事件
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

// 当添加文章表单提交的时候
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

// 获取浏览器地址栏的id参数
var id = getUrlParams('id');
// 当前管理员在做修改文章操作
if(id != -1){
    // 根据id获取文章的详细信息
    $.ajax({
        type:'get',
        url:'/posts/' + id ,
        success: function(response){
            $.ajax({
                type:'get',
                url:'/categories',
                success:function(categories){
                      response.categories = categories;
                      console.log(response);
                      var html = template('modifyTpl',response);
                      console.log(html);
                      $('#parentBox').html(html);
                }
            });
           
           
        }

    })
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name){
    var paramsAry = location.search.substr(1).split('&');
    //  循环数据
    for(var i = 0; i < paramsAry.length ; i ++ ){
        var tmp = paramsAry[i].split('=');
       if(tmp[0] == name){
           return tmp[1];
       };
        
    }
    return -1;
}

// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit','#modifyForm',function(){
    //    获取管理员在表单中输入的信息
    var formData = $(this).serialize();
    // 获取管理员正在修改的文章id只
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/posts/' + id,
        data : formData,
        success: function(){
            location.href = '/admin/posts.html';
        }
    })
    return false;
})