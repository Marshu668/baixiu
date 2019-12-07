// 获取元素,绑定事件
// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit',function(){
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务器发送请求,添加分类
    $.ajax({
        type:'post',
        url:'/categories',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    // 阻止表单默认行为
    return false;

})

//发送ajax请求.、 向服务器端所有分类列表数据
$.ajax({
    type:'get',
    url:' /categories',
    success:function(response){
        //  console.log(response);
        // 将服务器端返回的数据和html模版进行拼接
         var html = template('categoryListTpl',{data: response});
        //  将拼接好的内容放到页面中
         $('#categoryBox').html(html);

    }
})

// 为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function(){
    // 获取要修改的分类数据的id
    var id =  $(this).attr('data-id');
    // 根据id获取分类信息的详细信息
    $.ajax({
        type:'get',
        url:'/categories/' + id,
        success:function(response){
            console.log(response);
            var html = template('modifyCategoryTpl',response);
            $('#formBox'). html(html);
        }
    })
})
// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory',function(){
    // 获取用户在表单中输入的内容
    var formDate = $(this).serialize();
    // 获取要修改的分类ID
    var id = $(this).attr('data-id');
    // 发送请求,修改分类数据
     $.ajax({
         type:'put',
         url:'/categories/' + id,
         data:formDate,
         success:function(){
             location.reload();
         }
     })
    // 阻止表单默认行为
  return false;
})

// 当删除按钮被点击的时候,使用的是事件委托,把事件绑定在父级身上,作用在子级身上
$('#categoryBox').on('click','.delete',function(){
    if(confirm('你真的要执行这个操作吗')){
        // 获取要删除的分类数据的id
        //设置和获取被选中自定义属性的属性值
        // prop() 获取和设置自带属性的属性组,例如src(),href()
        var id = $(this).attr('data-id');
        // 像服务器发送请求,删除分类数据
        $.ajax({
            type:'delete',
            url:'/categories/' + id,
            success:function(){
                location.reload();
            }
        })
    }
})