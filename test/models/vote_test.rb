require "test_helper"

class VoteTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'sam@example.com',
                    password: 'welcome',
                    password_confirmation: 'welcome')
    @poll = Poll.new(title: 'This is a test poll', user: @user)
    @option = Option.new(option: 'This is a test poll', poll: @poll)

    Vote.delete_all

    @vote = Vote.new(user: @user, poll: @poll, option: @option)
  end

  def test_valid_vote_should_be_saved
    assert_difference 'Vote.count' do
      @vote.save
    end
  end

  def test_vote_should_not_be_valid_without_poll
    @vote.poll = nil
    assert @vote.invalid?
  end

  def test_vote_should_not_be_valid_without_user
    @vote.user = nil
    assert @vote.invalid?
  end

  def test_vote_should_not_be_valid_without_option
    @vote.option = nil
    assert @vote.invalid?
  end
end