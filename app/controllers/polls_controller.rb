class PollsController < ApplicationController
    before_action :authenticate_user_using_x_auth_token, except: %i[index]
    before_action :load_poll, only: %i[show update destroy]
    before_action :load_options, only: %i[show]

    def index
        polls = Poll.all
        render status: :ok, json: { polls: polls }
    end

    def create
        @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
        authorize @poll
        if @poll.save
            render status: :ok, json: { notice:  t('successfully_created', entity: 'Poll') }
        else 
            errors = @poll.errors.full_messages
            render status: :unprocessable_entity, json: { errors: errors  }
        end
    end

    def show
        authorize @poll
        @options = @poll.options
        render status: :ok, json: { poll: @poll, options: @options}
    end

    def update
        authorize@poll
        if @poll.update(poll_params)
            render status: :ok, json: { notice: 'Successfully updated poll.' }
        else
            render status: :unprocessable_entity, json: { errors: @poll.errors.full_messages }
        end
    end

    def destroy
        authorize @poll
        if @poll.destroy
            render status: :ok, json: { notice: 'Successfully deleted poll.' }
        else
            render status: :unprocessable_entity, json: { errors:@poll.errors.full_messages }
        end
    end

    private

    def poll_params
        params.require(:poll).permit(:title,:options_attributes => [:id, :option])
    end

    def load_poll
        @poll = Poll.find_by_slug!(params[:slug])
        rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors}
    end

    def load_options
        @options = Option.where(polls: @poll.id)
        rescue ActiveRecord::RecordNotFound => errors
            render json: {errors: errors}
    end
    
end
