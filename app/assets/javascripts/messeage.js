
$(function(){
  function buildHTML(data) {  
    var html = `<div class="message">
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
});