require "test_helper"

class PollTest < ActiveSupport::TestCase
    def setup
        @user = User.create(first_name: "John",
                            last_name: "doe",
                            email: "john@example.com",
                            password: "password",
                            password_confirmation: "password")
        Poll.delete_all

        @poll = Poll.new(title: "First poll title", user: @user)
    end

    def test_instance_of_poll
        assert_instance_of Poll, @poll
    end

    def test_not_instance_of_poll
        assert_not_instance_of Poll, @user
    end

    def test_poll_returns_correct_title
        assert_equal "First poll title", @poll.title
    end

    test "error raised" do
        assert_raises ActiveRecord::RecordNotFound do
            Poll.find(SecureRandom.uuid)
        end
    end

    def test_poll_should_not_be_valid_without_title
        @poll.title = ""
        assert_not @poll.valid?
    end

    def test_title_should_be_of_valid_length
        @poll.title = "a" * 101
        assert @poll.invalid?
    end

    def test_poll_slug_is_parameterized_title
        title = @poll.title
        @poll.save!
        assert_equal title.parameterize, @poll.slug
    end

    def test_incremental_slug_generation_for_polls_with_same_title
        first_poll = Poll.create!(title: 'test poll', user: @user)
        second_poll = Poll.create!(title: 'test poll', user: @user)

        assert_equal 'test-poll', first_poll.slug
        assert_equal 'test-poll-2', second_poll.slug
    end

    def test_updating_title_does_not_update_slug
        @poll.save!
        poll_slug = @poll.slug

        updated_poll_title = 'updated poll tile'
        @poll.update!(title: updated_poll_title)

        assert_equal updated_poll_title, @poll.title

        assert_equal poll_slug, @poll.slug
    end

    def test_slug_to_be_reused_after_getting_deleted
        first_poll = Poll.create!(title: 'test poll', user: @user)
        second_poll = Poll.create!(title: 'test poll', user: @user)

        second_poll_slug = second_poll.slug
        second_poll.destroy
        new_poll_with_same_title = Poll.create!(title: 'test poll', user: @user)

        assert_equal second_poll_slug, new_poll_with_same_title.slug
    end
end