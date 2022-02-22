class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def serializable_hash(options)
    Hash[attributes.map { |k, v| [k.camelize(:lower), v] }]
  end
end
