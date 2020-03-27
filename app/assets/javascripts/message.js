$(function() {

  var buildHTML = function(message) {
    var html_name =   `<div class="upper-message chat_box__top">
                        <div class="upper-message__user-name chat_box__top__name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date chat_box__top__date ">
                          ${message.created_at}
                        </div>
                      </div>`
    var html_content = `<p class="lower-message__content .chat_box__content__comment">
                          ${message.content}
                        </p>`
    var html_image = `<img src="` + message.image + `" class="lower-message__image chat_box__content__image" >`

    if (message.content && message.image) {
      var html = `<div class="chat_box" data-message-id=${message.id} >` +
                    html_name + 
                    `<div class="lower-message chat_box__content">` +
                      html_content +
                      html_image +
                    `</div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="chat_box" data-message-id=${message.id} >` +
                    html_name + 
                    `<div class="lower-message chat_box__content">` +
                      html_content +
                    `</div>
                  </div>`
    } else if (message.image) {
      var html = `<div class="chat_box" data-message-id=${message.id} >` +
                    html_name + 
                    `<div class="lower-message chat_box__content">` +
                      html_image +
                    `</div>
                  </div>`
    };
  return html;
};

  var reloadMessages = function(){
    var last_message_id = $('.chat_box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
      .done(function(messages) {
        console.log(messages)
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      })
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.form__sent').prop('disabled', false);
      })
      .fail(function(){
        alert("メッセージの送信に失敗しました");
      });
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});





// function buildHTML(message){
//   if ( message.image ) {
//     var html = `<div class="chat_box">
//                   <div class="chat_box__top">
//                     <div class="chat_box__top__name">
//                       ${message.user_name}
//                     </div>
//                     <div class="chat_box__top__date">
//                       ${message.created_at}
//                     </div>
//                   </div>
//                   <div class="chat_box__content">
//                     <p class="chat_box__content__comment">
//                       ${message.content}
//                     </p>
//                     <img src=${message.image} >
//                   </div>
//                 </div>`
//     return html;
//   }else {
//     var html = `<div class="chat_box">
//                   <div class="chat_box__top">
//                     <div class="chat_box__top__name">
//                       ${message.user_name}
//                     </div>
//                     <div class="chat_box__top__date">
//                       ${message.created_at}
//                     </div>
//                   </div>
//                   <div class="chat_box__content">
//                     <p class="chat_box__content__comment">
//                       ${message.content}
//                     </p>
//                   </div>
//                 </div>`
//     return html;
//   };
// }


