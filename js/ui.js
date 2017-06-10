// create name space for BlueD
var BlueD = BlueD ||{};

// create BlueD.UI
var BlueD = {
    UI: {
        // global variables
        TOTAL_MESSAGES: 0,
        MESSAGE_LIST: {},

        // refreshes listeners so jquery works with dynamically created html objects
        refreshClickListener: function() {
            $('#wrapper .close-message').off();
            $('#wrapper .close-message').on('click', function() {
                 alert('click');
            });
        },

        // this function creates a message and adds it to .inbox
        createMessage: function(title,message,type) {
            BlueD.UI.TOTAL_MESSAGES++;
            var messageID = 'msg' + BlueD.UI.TOTAL_MESSAGES;
            var buttonID = 'btn' + BlueD.UI.TOTAL_MESSAGES;
            var $divMessageTitle = "<div class='message-title'>" + title + "</div>";
            var $divCloseMessage = "<div class='btn btn-secondary close-message' role='button' id=" + buttonID +"></div>";
            var $divMessageHeader = "<div class='message-header'>" + $divMessageTitle + $divCloseMessage + "</div>";
            var $divMessageContent = "<div class='message-content'>" + message + "</div>";
            var $divMessagePositive = "<div class='message-positive message' id=" + messageID + ">" + $divMessageHeader + $divMessageContent + "</div>";
            var $divMessageNegative = "<div class='message-negative message' id=" + messageID + ">" + $divMessageHeader + $divMessageContent + "</div>";
            switch(type) {
                case 'positive':
                    $('.inbox').append($divMessagePositive);
                    BlueD.UI.refreshClickListener();
                    break;
                case 'negative':
                    $('.inbox').append($divMessageNegative);
                    BlueD.UI.refreshClickListener();
                    break;
            };
            BlueD.UI.refreshClickListener();
        },
    },
};

var refreshClickListener = function() {
    $('#wrapper .close-message').off();
    $('#wrapper .close-message').on('click', function() {
        alert('click');
    });
};

$(document).ready(function() {
    // create message
    $('#user-menu').on('click', function () {
        BlueD.UI.createMessage('title','message','negative');
    });
    BlueD.UI.refreshClickListener();
});