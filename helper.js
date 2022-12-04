function Getdatetime(){
    var value=new Date()
    var date=value.getDate();
    var month=value.getMonth();
    var year=value.getFullYear();
    var hours=value.getHours();
    var minutes=value.getMinutes();
    var seconds=value.getSeconds();
    var time= hours+':'+minutes+':'+seconds;
    var result=date + '-' + month + '-' + year + ' ' + time;
    return result;
}

module.exports= {Getdatetime}