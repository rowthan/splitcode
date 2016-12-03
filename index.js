/**
 * Created by rowthan on 2016/11/9.
 */
/**
 * Created by rowthan on 2016/10/19.
 */
'use strict';
var through = require('through2');
var splitline = require('./splitline');
var fs = require("../fs");
module.exports = function(opt) {
    function doSomething(file, encoding, callback) {
        // if (file.isBuffer()) {
        //     this.emit('error', new PluginError(PLUGIN_NAME, 'Buffers not supported!'));
        //     return callback();
        // }
        if (file.isNull()) {
            return callback(null, file);
        }

        if (file.isStream()) {
            return callback(createError(file, 'Streaming not supported'));
        }
        //do something
        var code = String(file.contents) ;
        file.contents = splitline.cut(code,120) ? splitline.cut(code,120):file.contents;//这里我们只是简单的改变了内容，实际上你可以你的自定义逻辑部分就在这里执行
        callback(null, file);
    }
    return through.obj(doSomething);
};