$(function(){
  var chatMembers = [];
  $("input[name='group[user_ids][]']").each(function(i){
    var chatMember = $("input[name='group[user_ids][]']").eq(i).val();
    chatMembers.push(chatMember);
  });

  function appendUser(user){
    var html =`<div class="chat-group-user clearfix id="chat-group-user-${user.id}">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    $("#user-search-result").append(html)
  }

  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${msg}</p>
               </div>`
    $("#user-search-result").append(html)
  }

  function addAppendUser(user){
    var html = `<div class='chat-group-user clearfix' id='chat-group-user-${user.userId}'>
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
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          for(var i = 0; i < chatMembers.length; i++){
            var flg = 0;
            if(user.id == chatMembers[i]){
              break;
            }
            if(i < chatMembers.length-1){
              continue;
            }
            appendUser(user);
          }
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
      chatMembers =[];
      $("input[name='group[user_ids][]']").each(function(i){
        var chatMember = $("input[name='group[user_ids][]']").eq(i).val();
        chatMembers.push(chatMember);
      });
      console.log(chatMembers);
    });

    $(document).on("click",'.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn',function(){
      $(this).parent().remove();
      chatMembers =[];
      $("input[name='group[user_ids][]']").each(function(i){
        var chatMember = $("input[name='group[user_ids][]']").eq(i).val();
        chatMembers.push(chatMember);
      });
      console.log(chatMembers);
    });
  })
});
