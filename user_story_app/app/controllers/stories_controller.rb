class StoriesController < ApplicationController
  # GET /stories
  # GET /stories.json
  def index

    # find all the alpha stories belonging to a specific user
    # via searching where ancestry equals nil
    alpha_stories = Story.where(:user_id => params[:user_id], :ancestry => nil).order('created_at ASC')


    # loop through those alpha stories and generate each alpha stories
    # hash representation -- grow the tree
    hashed_stories = []
    alpha_stories.each do |alpha_story|
      hashed_stories << alpha_story.create_hash_representation
    end
    # raise

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: hashed_stories }
    end
  end

  # GET /stories/1
  # GET /stories/1.json
  def show

    @story = Story.find(params[:id])


    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/new
  # GET /stories/new.json
  def new
    @story = Story.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @story }
    end
  end

  # GET /stories/1/edit
  def edit
    @story = Story.find(params[:id])
  end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(params[:story])

    respond_to do |format|
      if @story.save
        @story.adopt_parents_user_id
        format.html { redirect_to @story, notice: 'Story was successfully created.' }
        format.json { render json: @story }
      else
        format.html { render action: "new" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /stories/1
  # PUT /stories/1.json
  def update
    @user = User.find(params[:user_id])
    @story = Story.find(params[:id])

    respond_to do |format|
      if @story.update_attributes(params[:story])
        format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    @story = Story.find(params[:id])
    @story.destroy

    respond_to do |format|
      format.html { redirect_to stories_url }
      format.json { head :no_content }
    end
  end
end
