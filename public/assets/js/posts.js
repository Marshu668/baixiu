// 向服务器端发送请求 获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(resp){
        // console.log(resp);
        var html = template('postsTpl',resp)
        $("#postsBox").html(html) 
        var page = template('pageTpl',resp) 
        $("#page").html(page)   
    }
});

// 分页
function changePage (page){
    // alert(page)  
    // 向服务器端发送请求 获取文章列表数据
    $.ajax({
    type:'get',
    url:'/posts',
    data:{
        page:page
    },
    success:function(resp){
        // console.log(resp);
        var html = template('postsTpl',resp)
        $("#postsBox").html(html) 
        var page = template('pageTpl',resp) 
        $("#page").html(page)   
    }
    });
}
// 先服务器端发送请求 索要分页数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(resp){
        // console.log(resp);
        var html = template('categoryTpl',{data:resp})
        $("#categoryBox").html(html)
    }
})
// 当用户进行点击文章列表筛选时
$("#filterForm").on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(resp){
            // console.log(resp);
            var html = template('postsTpl',resp)
            $("#postsBox").html(html) 
            var page = template('pageTpl',resp) 
            $("#page").html(page)   
        }
    });
    return false
})


$('#postsBox').on('click' , '.delete', function(){
   if( confirm('你真的要删除吗?')){
    // 获取到管理员要删除的文章的id
        var id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            type:'delete',
            url:'/posts/' + id,
            success:function(){
                location.reload();
            }
        })
   }
})
