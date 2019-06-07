
$(function(){
  function buildHTML(data) {  
    var html = `<div class="message" data-id =${data.id}>
                  <div class="upper-info">
                    <p class="upper-info__user">${data.user_name}</p>
                    <p class="upper-info__date">${data.time}</p>
                  </div>
                  <div class="bottom-info">
                    <p class="bottom-info__text">${data.text}</p>
                    <img class="lower-messeage__image" src="${data.image.url}" alt=" ",onerror="this.style.display='none'/>
                  </div>
                </div>`
    return html
  }
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html
      
      if (!data.image.url && !data.text) {
        alert("メッセージを入力して下さい")
      } else {
        var html = buildHTML(data)
        $('.messages').append(html)
        $(".form__messeage").val("");
        $(".hidden").val("");
      }
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
    $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
    },'fast');
  })
/*******************************************
 *          自動更新用ソフト                  *
 *******************************************/
  $(function(){
    setInterval(reloadMessages, 5000);
  });

  function insertFullHTML(message) {
    var html = `
    <div class="message" data-id =${message.id}>
      <div class="upper-info">
        <p class="upper-info__user">${message.user_name}</p>
        <p class="upper-info__date">${message.time}</p>
      </div>
      <div class="bottom-info">
        <p class="bottom-info__text">${message.text}</p>
        <img class="lower-messeage__image" src="${message.image.url}" alt=" "/>
      </div>
    </div>`
    return html
  }

  function insertMessageHTML(message) {
    var html = `
    <div class="message" data-id =${message.id}>
      <div class="upper-info">
        <p class="upper-info__user">${message.user_name}</p>
        <p class="upper-info__date">${message.time}</p>
      </div>
      <div class="bottom-info">
        <p class="bottom-info__text">${message.text}</p>
      </div>
    </div>`
    return html
  }

  function insertImageHTML(message) {
    var html = `
    <div class="message" data-id =${message.id}>
      <div class="upper-info">
        <p class="upper-info__user">${message.user_name}</p>
        <p class="upper-info__date">${message.time}</p>
      </div>
      <div class="bottom-info">
        <img class="lower-messeage__image" src="${message.image.url}" alt=" "/>
      </div>
    </div>`
    return html
  }

  function insertHTML(message) {
    var html
    if (message.text && message.image.url) {
     html = insertFullHTML(message);
    } else if (message.text) {
      html = insertMessageHTML(message);
    } else if (message.image.url) {
      html = insertImageHTML(message);
    }
    $('.messages').append(html)
  }

  var reloadMessages = function() {
    group = $('.message').data('group')
    url = "/groups/" + group + "/api/messeages"
    if($('.messages')[0]){
      last_message_id = $('.message:last').data('id')
    } else {
      last_message_id = 0
    }
    $.ajax({
      url: url,
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      messages.forEach(function(message){
        insertHTML(message);
      })
    })
    .fail(function() {
      console.log("メッセージの送信に失敗しました");
    });
    $('.messages').animate({
      scrollTop: $('.messages')[0].scrollHeight
    },'fast');
  }
});