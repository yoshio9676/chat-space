$(function() {
  function buildHTML(message){
    if ( message.image ) {
      var html = `<div class="chat_box">
                    <div class="chat_box__top">
                      <div class="chat_box__top__name">
                        ${message.user_name}
                      </div>
                      <div class="chat_box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat_box__content">
                      <p class="chat_box__content__comment">
                        ${message.content}
                      </p>
                      <img src=${message.image} >
                    </div>
                  </div>`
      return html;
    }else {
      var html = `<div class="chat_box">
                    <div class="chat_box__top">
                      <div class="chat_box__top__name">
                        ${message.user_name}
                      </div>
                      <div class="chat_box__top__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="chat_box__content">
                      <p class="chat_box__content__comment">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
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
        console.log(data);
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.form__sent').prop('disabled', false)
      })
      .fail(function(){
        alert("メッセージの送信に失敗しました");
      });
  });
});


