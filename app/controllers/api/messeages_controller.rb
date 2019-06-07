class Api::MesseagesController < ApplicationController
  def index
    respond_to do |format|
      format.json { @new_message = Messeage.where('id > ?', params[:id]) } 
    end
  end
end