$(function(){
  /****************************************************** 
  *         メソッド名 : appendUser()
  *         意味 : Userの候補を表示する
  ******************************************************/
  
  function appendUser(user){
    var html =`<div class="chat-group-user clearfix id="chat-group-user-${user.id}">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
    $('.chat-group-form__search.clearfix').append(html)
  }
  
  /****************************************************** 
  *         メソッド名 : appendErrMsgToHTML()
  *         意味 : エラー時のHTML表記
  ******************************************************/
  
  function appendErrMsgToHTML(msg){
    var html =`<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${msg}</p>
               </div>`
    $('.chat-group-form__search.clearfix').append(html)
  }

  /****************************************************** 
  *         メソッド名 : addAppendUser()
  *         意味 : GroupにUserを追加する
  ******************************************************/

  function addAppendUser(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user.userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${user.userId}'>
                  <p class='chat-group-user__name'>${user.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
      $('#chat-group-users').append(html)
    }

  /****************************************************** 
   ****************************************************** 
  *         メソッド名 : ajax
  *         意味 : ajax通信
  * ****************************************************
  ******************************************************/

  $('#user-search-field').on("keyup",function(e){
    var input = $(this).val();
    var url = "/users";

    $.ajax({
      url: url,
      type: 'GET',
      data: {keyword: input},
      dataType: 'json'
    })

    /*********************************** *
    * メソッド名 : .done                   *
    * 意味 : ajax処理成功時                *
    *************************************/

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

    /*********************************** *
    * メソッド名 : .fail                   *
    * 意味 : ajax処理失敗時                *
    *************************************/

    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })
   /*********************************** *
   * メソッド名 : $(document).ready      *
   * 意味 : HTML要素を読みんだ後に発生させる *
   *************************************/

  $(function(){
    $(document).on("click",'.user-search-add.chat-group-user__btn.chat-group-user__btn--add',function(){
      user = $(this).data();
      addAppendUser(user);
      $(this).parent().remove();
    });
    
    $(document).on("click",'.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn',function(){
      console.log()
      $(this).parent().remove();
    });
  })
});
