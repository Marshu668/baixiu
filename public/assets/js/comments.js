// 向服务器发生请求,获取评论列表数据
$.ajax({
    type:'get',
    url:'/comments',
    success:function(response){
        console.log(response);
        var html =template('commentsTpl' ,response);
        console.log(html);
        $('#commentsBox').html(html);
       var pageHTML =  template('pageTpl',response);
       console.log(pageHTML);
       $('#pageBox').html(pageHTML);
    }
})

// 实现分页
function changePage(page){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:page
        },
        success:function(response){
            console.log(response);
            var html =template('commentsTpl' ,response);
            console.log(html);
            $('#commentsBox').html(html);
           var pageHTML =  template('pageTpl',response);
           console.log(pageHTML);
           $('#pageBox').html(pageHTML);
        }
    })
}

// 当审核按钮被点击当时候
$('#commentsBox').on('click','.status',function(){
    // 获取当前评论的状态
      var status = $(this).attr('data-status');
    //   获取当前要修改 的评论id
      var id = $(this).attr('data-id');
    //   向服务器发送请求,更改
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state :status == 0 ? 1 : 0
        },
        success:function(){
            location.reload();
        }
    })
} );

$('#commentsBox').on('click','.delete',function(){
    if(confirm('你确定要删除吗?')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/comments/' + id,
            
            success:function(){
                location.reload();
            }
        })
    }
}
)