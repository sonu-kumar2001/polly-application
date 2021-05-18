require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'Sam',
                    last_name: 'Smith',
                    email: 'sam@example.com',
                    password: 'welcome',
                    password_confirmation: 'welcome')
    @poll = Poll.new(title: 'This is a test poll', user: @user)

    Option.delete_all

    @option = Option.new(option: 'This is a test poll', poll: @poll)
  end

  def test_option_should_be_invalid_without_option
    @option.option = ''
    assert @option.invalid?
  end
  
  def test_option_should_not_exceed_maximum_length
    @option.option = 'a' * 121
    assert @option.invalid?
  end

  def test_valid_option_should_be_saved
    assert_difference 'Option.count' do
      @option.save
    end
  end

  def test_option_should_not_be_valid_without_poll
    @option.poll = nil
    assert @option.invalid?
  end
end