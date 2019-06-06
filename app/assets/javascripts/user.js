$(function(){
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix id="chat-group-user-${user.id}">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    $('.chat-group-form__search.clearfix').append(html)
  }

  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${msg}</p>
               </div>`
    $('.chat-group-form__search.clearfix').append(html)
  }

  function addAppendUser(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                  <p class='chat-group-user__name'>${user.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      $('#chat-group-users').append(html)
    }


  $('#user-search-field').on("keyup",function(e){
    var input = $(this).val();
    var url = "/users";

    $.ajax({
      url: url,
      type: 'GET',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $(".chat-group-user.clearfix").remove();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML('一致するユーザーが見つかりません');
      }
    })


    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })

  $(function(){
    $(document).on("click",'.user-search-add.chat-group-user__btn.chat-group-user__btn--add',function(){
      user = $(this).data();
      addAppendUser(user);
      $(this).parent().remove();
    });

    $(document).on("click",'.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn',function(){
      $(this).parent().remove();
    });
  })
});
