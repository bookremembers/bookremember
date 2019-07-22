var Confirm = (function Confirm() {
    function _show(message, okFun, cancelFun, okText, cancelText) {
        var alert_pan = "";
        alert_pan += '<div id="confirm_mask" style="z-index:'+ Number.MAX_SAFE_INTEGER +';position:fixed;top:0;left:0;width:100%;text-align: center;background-color: rgba(0,0,0,0.5);height:' + $(document).height() + 'px ">';
        alert_pan += '  <form class="confirm_form " style="display:inline-block">';
        alert_pan += '      <div class="confirm_pan" style="margin-top:' + (($(window).height() - 150) * 0.5) + 'px;padding:10px;border-radius:5px;background-color: white">';
        alert_pan += '          <div style="padding:20px;border-radius:5px;background-color: white">';
        alert_pan += '              <p style="margin:0 25px 20px 25px;color:#565656;font-size: 16px;text-align: center">';
        alert_pan +=                  message ;
        alert_pan += '              </p>';
        alert_pan += '              <div style="text-align: center;margin-bottom: 10px">';
        if (cancelText !== false) {
            alert_pan += '                  <a class="sq_btn sq_btn_gray confirm_pan_cancel_btn" style="margin-right: 20px">'+ (cancelText || "取消") +'</a>';   
        }
        if (okText !== false) {
            alert_pan += '                  <a class="sq_btn sq_btn_black confirm_pan_submit_btn" >' + (okText || "确定") + '</a>';   
        }
        alert_pan += '              </div>';
        alert_pan += '          </div>';
        alert_pan += '      </div>';
        alert_pan += '  </form>';
        alert_pan += '</div>';

        $(document.body).append(alert_pan);
        
        $(document).on(TOUCHE_END, '#confirm_mask .confirm_pan_cancel_btn', function (e) {
            e.stopPropagation();
            var self = this;
            var toSetNum = setTimeout(function () {
                $(document).off(TOUCHE_END, '#confirm_mask .confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '#confirm_mask .confirm_pan_submit_btn');
                if (cancelFun)
                    cancelFun();
                $(self).parents('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100);
        }).on(TOUCHE_END, '#confirm_mask .confirm_pan_submit_btn', function (e) {
            var self = this;
            e.stopPropagation();
            var toSetNum = setTimeout(function () {
                if (okFun)
                    okFun();
                $(document).off(TOUCHE_END, '#confirm_mask .confirm_pan_cancel_btn');
                $(document).off(TOUCHE_END, '#confirm_mask .confirm_pan_submit_btn');
                $(self).parents('#confirm_mask').remove();
                clearTimeout(toSetNum);
            }, 100);
        });
    }
    return {
        /**
         * @param message
         * @param okFun
         * @param cancelFun
         * @param okText
         * @param cancelText
         * @private
         */
        show: function (message, okFun, cancelFun, okText, cancelText) {
            _show(message, okFun, cancelFun, okText, cancelText);
        },
        showCancel: function(message) {
            _show(message, null, null, false);
        },
        showOk: function(message) {
            _show(message, null, null, null, false);
        }
    }
})();