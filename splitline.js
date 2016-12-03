/**
 * Created by rowthan on 2016/11/9.
 */
exports.cut = function (code,length) {
    if(!length){
        length = 120;
    }
    var result ;
    if(split(code,length).modif){
        console.log("有更新");
        result  = new Buffer(split(code,length).code);
    }
    else{
        console.log("无修改");
    }
    return result;
};

function split(code,length) {
    var lines = code.split("\n");
    var formatResult = "";
    var temp = "" ;
    var pre = "";
    var blankReg = /^(\s*\t*).*/;
    var isAnnoReg = /\/\//;
    var modifFlag = false;
    //遍历每一行
    for(var i=0;i<lines.length;i++){
        var codelength = lines[i].length;
        temp = lines[i]+"\n";
        //长度过长 并且不是注释行 进行切割
        if(codelength > length && !lines[i].match(isAnnoReg)){
            modifFlag = true;
            temp = "";
            pre = lines[i].match(blankReg)[1];
            var indexArray = [];
            var splitIndex = 0;
            // 如果存在等号
            var equalIndex = lines[i].indexOf("=");
            var plusIndex = lines[i].indexOf("+");
            //+号 优先级最高
            if(plusIndex > 0 && codelength-plusIndex < length){
                console.log("通过+有效分割");
                splitIndex = plusIndex;
            }
            else if(equalIndex > 0 && codelength-equalIndex < length){
                console.log("通过=有效分割");
                splitIndex = equalIndex;
            }
            else{
                //对每一行每个字符判断 做分割依据
                for(var j = codelength; j > 0; j--){
                    //=优先级最高
                    if( lines[i][j]==" " | lines[i][j]=="."){
                        if(codelength-j < length){
                            console.log("通过 或 . 分割"+j+lines[i]);
                            splitIndex = j;
                            break; //跳出一行后其他字符判断
                        }
                        else{
                            indexArray.push(j);
                        }
                    }
                }
            }
            temp = lines[i].substring(0,splitIndex)+ "\n"+pre+"\t"+lines[i].substring(splitIndex)+"\n";
        }
        formatResult = formatResult + temp;
    }
    return {code:formatResult,modif:modifFlag};
}

function closest(arr, num){
    var ret = arr[0];
    var distance = Math.abs(ret - num);
    for(var i = 1; i < arr.length; i++){
        var newDistance = Math.abs(arr[i] - num);
        if(newDistance < distance){
            distance = newDistance;
            ret = arr[i];
        }
    }
    return ret;
}