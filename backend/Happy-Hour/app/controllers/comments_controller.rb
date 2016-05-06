class CommentsController < ApplicationController
#       Prefix Verb   URI Pattern                  Controller#Action
#     comments GET    /comments(.:format)          comments#index
#              POST   /comments(.:format)          comments#create
#  new_comment GET    /comments/new(.:format)      comments#new
# edit_comment GET    /comments/:id/edit(.:format) comments#edit
#      comment GET    /comments/:id(.:format)      comments#show
#              PATCH  /comments/:id(.:format)      comments#update
#              PUT    /comments/:id(.:format)      comments#update
#              DELETE /comments/:id(.:format)      comments#destroy
  def index
    @comment = Comment.all # this gets all comments
    render json: @comment.to_json # this converts to JSON
  end

  def create
    # POST to create a new comment
    puts params[:comment]
    @comment = Comment.new(comment_params)
    puts @comment
    if @comment.save
      render json: @comment.to_json, status: 201
    else
      render json: "{error: 'did not save'}".to_json, status: 444
    end

  end

  # def new
  #   # GET to get FORM to create new comment
  #   @comment = Comment.new
  #   render json: @comment.json
  # end

  # def edit
  # end
  #
  # def show
  # end
  #
  # def update
  # end

  # def destroy
  # end
  private

  def comment_params
    params.require(:comment).permit(:content, :place_id)
  end

end
