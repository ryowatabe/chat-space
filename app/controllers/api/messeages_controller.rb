class Api::MesseagesController < ApplicationController
  def index
    respond_to do |format|
      format.json { @new_message = Messeage.where('id > ? and group_id = ?', params[:id], params[:group_id]) } 
    end
  end
end