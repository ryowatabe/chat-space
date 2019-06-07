json.array! @new_message do |message|
  json.text       message.messeages
  json.image      message.image
  json.time       message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name  message.user.name
  json.id         message.id
end
