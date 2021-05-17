class Option < ApplicationRecord
    belongs_to :poll
    has_many :votes, dependent: :destroy
    validates :option, presence: true, length: { maximum: 120 }
end