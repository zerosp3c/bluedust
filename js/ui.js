/*
    This module creates the UI
*/

var UI = {
    userTerminalText: '',
    log: [],
    inbox: [],

    // refresh clickers
    refreshClickListener: function() {
         // turn off button listeners
        $('#wrapper .close-message').off();
        $('#wrapper #user-log').off();
        $('#wrapper #log-close').off();
        $('#wrapper #user-terminal-text').off();

        // turn on buttons
        $('#wrapper #user-terminal-text').on('keydown', function(event) {
            var length = $('#user-terminal-text').val().length;
            if (event.which === 13) {
                event.preventDefault();
                UI.log.push([$('#user-terminal-text').val(),'input']);
                UI.userTerminalText = $('#user-terminal-text').val().slice(15);
                $echo = "<p>>> " + UI.userTerminalText + "</p>";
                UI.echo($echo);
            } else if (event.which === 8 && length <= 15) {
                event.preventDefault();
            } else if (event.which === 38) {
                event.preventDefault();
                $echo = UI.userTerminalText;
                UI.reverseEcho($echo);
            };
        });

        $('#wrapper .close-message').on('click', function() {
            var messageId = 'msg' + $(this).attr('id').slice(3);
            var targetId = '#' + messageId;
            $(targetId).remove();
            UI.inboxDelete(messageId);
        });

        $('#wrapper #user-log').on('click', function() {
            $('#log').remove();
            UI.logRead();
        });

        $('#wrapper #log-close').on('click', function() {
             $('#log').remove();
        });
    },

    // work with terminal text
    echo: function(echo) {
        $('#user-terminal-text').val('dnl@olivaw: >> ');
        $('#terminal-echo').empty();
        $('#terminal-echo').append(echo);
        UI.refreshClickListener();
    },

    reverseEcho: function(echo) {
        $('#user-terminal-text').val('');
        $('#user-terminal-text').val('dnl@olivaw: >> ' + echo);
        UI.refreshClickListener();
    },

    // create and manage inbox
    inboxDelete: function(message) {
        for (i in UI.inbox) {
            if (UI.inbox[i] === message) {
                UI.inbox.splice(i,1);
            };
        };
    },

    // create and manage log
    logRead: function() {
        var $divLog = "<div class='row' id='log'><div class='col-sm-2' id='log-title'><h4>log</h4></div>\
        <div class='col-sm-6'><ul id='log-ul'></ul></div>\
        <div class='col-sm-2'><div id='log-close'><h4>close</h4></div></div>";
        $('.screen').prepend($divLog);
        for(i=0;i < UI.log.length;i++) {
            var $logEntry = "<li>" + UI.log[i][0] + " - " + UI.log[i][1] + "</li>";
            $('#log-ul').prepend($logEntry);
        };
        UI.refreshClickListener();
    },

    // this function creates a message and adds it to inbox
    createMessage: function(title,message,type,log) {
        UI.TOTAL_MESSAGES++;
        var messageID = 'msg' + UI.TOTAL_MESSAGES;
        var buttonID = 'btn' + UI.TOTAL_MESSAGES;
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
                UI.inbox.push(messageID);
                UI.log.push([log,type]);
                break;
            case 'negative':
                $('.screen').prepend($divMessageNegative);
                UI.inbox.push(messageID);
                UI.log.push([log,type]);
                break;
        };
        UI.refreshClickListener();
    },
};

// this code runs when the HTML DOM is ready
$(document).ready(function() {
    UI.refreshClickListener();
});