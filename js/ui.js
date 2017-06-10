// create name space for BlueD
var BlueD = BlueD ||{};

// create BlueD.UI
var BlueD = {
    UI: {
        // create and manage inbox
        inbox: [],
        inboxDelete: function(message) {
            for (i in BlueD.UI.inbox) {
                if (BlueD.UI.inbox[i] === message) {
                    BlueD.UI.inbox.splice(i,1);
                };
            };
        },

        // refreshes listeners so jquery works with dynamically created html objects
        refreshClickListener: function() {
            $('#wrapper .close-message').off();
            $('#wrapper .close-message').on('click', function() {
                var messageId = 'msg' + $(this).attr('id').slice(3);
                var targetId = '#' + messageId;
                $(targetId).remove();
                BlueD.UI.inboxDelete(messageId);
            });
        },

        // this function creates a message and adds it to inbox
        createMessage: function(title,message,type) {
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
                    $('.inbox').append($divMessagePositive);
                    BlueD.UI.inbox.push(messageID);
                    BlueD.UI.refreshClickListener();
                    break;
                case 'negative':
                    $('.inbox').append($divMessageNegative);
                    BlueD.UI.inbox.push(messageID);
                    BlueD.UI.refreshClickListener();
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