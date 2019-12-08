$('#file').on('change',function(){
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response[0].image);
            $('#image').val(response[0].image);
        }
    })
})

$('#slidesForm').on('submit', function(){
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            location.reload();
        }
    })


    return false;
})


// 想服务器端发送请求,索要图片轮播图列表数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(response){
        console.log(response);
        var html = template('slidesTpl',{data:response});
        $('#slidesBox').html(html)
    }
})


$('#slidesBox').on('click','.delete',function(){
    if(confirm('你真的要删除吗?')){
        var id =$(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/slides/' + id,
            success:function(){
                location.reload();
            }

        })
    }
})