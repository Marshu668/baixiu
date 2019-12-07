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
// 处理日期时间格式
function formateDate(date){
    date = new Date(date)
    return date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
}
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

