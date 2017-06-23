class OwnersController < ApplicationController
  def index
    @owners = Owner.all
    render json: @owners

  end

  def show
    @owner = Owner.find(params[:id])
  end
end
