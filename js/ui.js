// create name space for BlueD
var BlueD = BlueD ||{};

// create BlueD.UI
var BlueD = {
    UI: {
        // refresh and turn on click listeners
        refreshClickListener: function() {
            // turn off button listeners
            $('#wrapper .close-message').off();
            $('#wrapper #user-log').off();
            $('#wrapper #log-close').off();
            $('#wrapper .user-terminal-text').off();

            // turn on buttons
            $('#wrapper .user-terminal-text').on('keydown', function(event) {
                if (event.which === 13) {
                    event.preventDefault();
                    var userTerminalText = $('.user-terminal-text').val();
                    $('.user-terminal-text').val('');
                    return(userTerminalText);
                };
            });
            $('#wrapper .close-message').on('click', function() {
                var messageId = 'msg' + $(this).attr('id').slice(3);
                var targetId = '#' + messageId;
                $(targetId).remove();
                BlueD.UI.inboxDelete(messageId);
            });
            $('#wrapper #user-log').on('click', function() {
                $('#log').remove();
                BlueD.UI.logRead();
            });
            $('#wrapper #log-close').on('click', function() {
                $('#log').remove();
            });
        },

        // enter user terminal text
        userEnter: function(e) {
            if (e.keyCode===13) {
                e.preventDefault();
                alert('enter was pressed');
            };
        },

        // create and manage inbox
        inbox: [],
        inboxDelete: function(message) {
            for (i in BlueD.UI.inbox) {
                if (BlueD.UI.inbox[i] === message) {
                    BlueD.UI.inbox.splice(i,1);
                };
            };
        },

        // create and manage log
        log: [],
        logRead: function() {
            var $divLog = "<div class='row' id='log'><div class='col-sm-2' id='log-title'><h4>log</h4></div>\
            <div class='col-sm-6'><ul id='log-ul'></ul></div>\
            <div class='col-sm-2'><div id='log-close'><h4>close</h4></div></div>";
            $('.screen').prepend($divLog);
            for(i=0;i < BlueD.UI.log.length;i++) {
                var $logEntry = "<li>" + BlueD.UI.log[i][0] + " - " + BlueD.UI.log[i][1] + "</li>";
                $('#log-ul').prepend($logEntry);
            };
            BlueD.UI.refreshClickListener();
        },

        // this function creates a message and adds it to inbox
        createMessage: function(title,message,type,log) {
            BlueD.UI.TOTAL_MESSAGES++;
            var messageID = 'msg' + BlueD.UI.TOTAL_MESSAGES;
            var buttonID = 'btn' + BlueD.UI.TOTAL_MESSAGES;
            var $divMessageTitle = "<div class='message-title'>" + title + "</div>";
            var $divCloseMessage = "<div class='btn btn-secondary close-message' role='button' id=" + buttonID +"></div>";
            var $divMessageHeader = "<div class='message-header'>" + $divMessageTitle + $divCloseMessage + "</div>";
            var $divMessageContent = "<div class='message-content'>" + message + "</div>";
            var $divMessagePositive = "<div class='message-positive message' id=" + messageID + ">\
            " + $divMessageHeader + $divMessageContent + "</div>";
            var $divMessageNegative = "<div class='message-negative message' id=" + messageID + ">\
            " + $divMessageHeader + $divMessageContent + "</div>";
            switch(type) {
                case 'positive':
                    $('.screen').prepend($divMessagePositive);
                    BlueD.UI.inbox.push(messageID);
                    BlueD.UI.log.push([log,type]);
                    break;
                case 'negative':
                    $('.screen').prepend($divMessageNegative);
                    BlueD.UI.inbox.push(messageID);
                    BlueD.UI.log.push([log,type]);
                    break;
            };
            BlueD.UI.refreshClickListener();
        },
    },
};

// this code runs when the HTML DOM is ready
$(document).ready(function() {
    BlueD.UI.refreshClickListener();
});