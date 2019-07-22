/**
 * Created by naxiaoguang on 2017/3/28.
 */

function CommandChannel(options){
    this.options = options ;
    this.processList = {};
}

CommandChannel.prototype.registerHandler = function(handler){
    var self = this ;
    var process_list = handler.processList ;
    if(!process_list)throw new Error('no processList attr');

    handler.registerController(self.options,self);

    for(var i in process_list){
        var item = process_list[i] ;
        var command = item.command ;
        var call = item.call ;
        if(!self.processList[command])
            self.processList[command] = call;
        else
            throw new Error(command + ' has already been registered');
    }
};

CommandChannel.prototype.postCommand = function(command,vo){
    var self = this ;
    var handler = self.processList[command] ;
    if(handler)
        handler(vo);
    else
        throw new Error('no command ' + command) ;
};