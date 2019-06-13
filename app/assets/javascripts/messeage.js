
$(function(){
  function buildHTML(data) {
    if (data.image.url){
      var ImageHTML = `<img class="lower-messeage__image" src="${data.image.url}">`
    } else{
      var ImageHTML = ""
    }

    var html = `<div class="message" data-id =${data.id}>
                  <div class="upper-info">
                    <p class="upper-info__user">${data.user_name}</p>
                    <p class="upper-info__date">${data.time}</p>
                  </div>
                  <div class="bottom-info">
                    <p class="bottom-info__text">${data.text}</p>
                    ${ImageHTML}
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
      var html = buildHTML(data)
      $('.messages').append(html)
      $(".form__messeage").val("");
      $(".hidden").val("");
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

  var reloadMessages = function() {
    group = $('.message').data('group')
    url = "/groups/" + group + "/api/messeages"
    matchUrl = "/groups/" + group + "/messeages"
    last_message_id = $('.message:last').data('id')
    if (location.pathname === matchUrl){
      $.ajax({
        url: url,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML)
          })
          $('.messages').animate({
            scrollTop: $('.messages')[0].scrollHeight
          },'fast');
        }
      })
      .fail(function() {
        alert("自動更新に失敗しました。");
      });
    }
  }
});