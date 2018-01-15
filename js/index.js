//获取复选框对象
var ck=document.getElementById('ck');
var ipts=document.querySelectorAll('form input');
var selects=document.querySelectorAll('select');
var keyCode=document.getElementById('keyCode');
disable();
var code=null;
ck.onclick=function(){
    if(ck.checked){
        noDiable();
        code=getKode();
    }else {
        disable();
        var prompts=document.querySelectorAll('.prompt');
        for(var i=0;i<prompts.length;i++){
            prompts[i].innerText='';
        }
        document.querySelector('form').reset();
    }
};
//年月日
var year=new Date().getFullYear();
var years=document.getElementById('year');
for(var i=year-20;i<year-10;i++){
    var option1=document.createElement('option');
    option1.innerText=i;
    years.appendChild(option1);
}
var month=document.getElementById('month');
for(var i=1;i<=12;i++){
    var option2=document.createElement('option');
    option2.innerText=i;
    month.appendChild(option2);
}
var day=document.getElementById('day');
day.onfocus=function(){
   var days=getDay(years.value,month.value);
    day.innerHTML='';
    for(var i=1;i<=days;i++){
        var option=document.createElement('option');
        option.innerText=i;
        day.appendChild(option);
    }
};
//昵称、密码、邮箱校验
var username=document.querySelector('[name=username]');
username.onkeyup=function(){
    var prompt=document.querySelector('#username .prompt');
    var usernameValue=this.value;
    if(!(/^[\u4e00-\u9fa5]{2,6}$/.test(usernameValue))){
        prompt.innerText='用户名必须为2-6位，且为纯中文';
        return false;
    }
    prompt.innerText='';
};
var password=document.querySelector('[name=password1]');
password.onkeyup=function(){
    var passwordValue=this.value;
    var prompt=document.querySelector('#password .prompt');
    if(!(/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).(?=.*?[a-z]).*$/.test(passwordValue))){
        prompt.innerText='密码必须含有一个大小写字母和数字';
        return false;
    }
    prompt.innerText='';
};
var password2=document.querySelector('[name=password2]');
password2.onkeyup=function(){
    var passwordValue=this.value;
    var prompt=document.querySelector('#password2 .prompt');
    if(!(passwordValue==password.value)){
       prompt.innerText='密码不一致';
        return false;
    }
    prompt.innerText='';
};
var mail=document.querySelector('[name=mail]');
mail.onkeyup=function(){
    var mailValue=this.value;
    var prompt=document.querySelector('#mail .prompt');
    if(!(/^([a-zAZ])([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(mailValue))){
        prompt.innerText='邮箱格式不正确';
        return false;
    }
    prompt.innerText='';
};
//验证码校验
var codeInput=document.querySelector('[name=code]');
codeInput.onkeydown=function(e){
    var prompt=document.querySelector('#code .prompt');
    if(e.keyCode==13){
        var codeValue=this.value;
        if(!(codeValue==code)){
            prompt.innerText='验证码错误';
            prompt.style.color='red';
            this.disabled=true;
            return false;
        }
        prompt.innerText='验证码正确';
        prompt.style.color='green';
        this.blur();
    }
};
//刷新按钮注册点击事件
document.querySelector('.refresh').onclick=function(){
    if(!ck.checked){
        return false;
    }
    code=getKode();
    codeInput.disabled=false;
    document.querySelector('#code .prompt').innerText='';
};
//以下为函数封装
function disable(){
    for(var i=0;i<ipts.length;i++){
        ipts[i].disabled=true;
    }
    for(var i=0;i<selects.length;i++){
        selects[i].disabled=true;
    }
}
function noDiable(){
    for(var i=0;i<ipts.length;i++){
        ipts[i].disabled=false;
    }
    for(var i=0;i<selects.length;i++){
        selects[i].disabled=false;
    }
}
function getKode(){
    var resut=null;
    var arr=['+','-','*'];
    //随机获取0-9之间的数字
    function rdm(){
        return Math.floor((Math.random()*9+1));
    }
    var num1=rdm();
    var num2=rdm();
    //随机获取运算符
    var i=arr[Math.floor((Math.random()*arr.length))];
    if(i=='-'){
        if(num1<num2){
            var tmp=num1;
            num1=num2;
            num2=tmp;
        }
        resut=num1-num2;
    }else if(i=='*'){
        resut=num1*num2;
    }else {
        resut=num1+num2;
    }
    keyCode.innerHTML=num1+i+num2+'=?';
    return resut;
}
// 根据年月获取天数
function getDay(year,month){
    return new Date(parseInt(year),parseInt(month),0).getDate();
}