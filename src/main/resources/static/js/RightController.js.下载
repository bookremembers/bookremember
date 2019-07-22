function RightController(){
    this.audio_duration = Number.MAX_SAFE_INTEGER ;
    this.audios = Number.MAX_SAFE_INTEGER ;
    this.grade = Number.MAX_SAFE_INTEGER ;
    this.images = Number.MAX_SAFE_INTEGER ;
    this.is_top = Number.MAX_SAFE_INTEGER ;
    this.level = Number.MAX_SAFE_INTEGER ;
    this.more_font = Number.MAX_SAFE_INTEGER ;
    this.pdfs = Number.MAX_SAFE_INTEGER ;
    this.video_duration = Number.MAX_SAFE_INTEGER ;
    this.videos = Number.MAX_SAFE_INTEGER ;
}
RightController.prototype.setDefaultRight = function(right){
    if(!right)return ;
    this.level = right.level;
    this.grade = right.grade;
    this.is_top = right.is_top;
    this.audio_duration = right.audio_duration ;
    this.audios = right.audios ;
    this.images = right.images ;
    this.more_font = right.more_font ;
    this.pdfs = right.pdfs ;
    this.video_duration = right.video_duration ;
    this.videos = right.videos ;
};
RightController.prototype.getImageCount = function(){
    return this.images ;
};
RightController.prototype.getVideoCount = function(){
    return this.videos ;
};
RightController.prototype.getAudioCount = function(){
    return this.audios ;
};