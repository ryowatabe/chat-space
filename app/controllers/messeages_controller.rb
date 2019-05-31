class MesseagesController < ApplicationController
  before_action :set_group

  def index
    @messeages = @group.messeages.includes(:user)
    @messeage = Messeage.new
  end

  def create
    @messeage = @group.messeages.new(message_params)
    if @messeage.save
      redirect_to group_messeages_path(@group), notice: 'メッセージが送信されました'
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:messeage).permit(:messeages, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
