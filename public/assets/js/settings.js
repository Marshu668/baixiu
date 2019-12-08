$('#logo').on('change',function(){
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            console.log(response);
            $('#hiddenLogo').val(response[0].logo);
            // 将logo图片显示在页面中
            $('#preview').attr('src',response[0].logo);
        }
    })
})


function serializeobj(form) { 
    let result = form.serializeArray();
    let obj = {}; 
     result.forEach(item => { obj[item.name] = item.value });
     return obj; 
}; 

$('#settingsForm').on('submit',function(){
    var formData = serializeobj(this);
    formData.comment = formData.comment == 'on' ? 'true' :'false';
    formData.review = formData.review == 'on' ? 'true' :'false';


    
   
    // var formData =$(this).serialize();
    // console.log(formData);

    
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
})


// 向服务器端发送请求,索要网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response);
        
    }
})
