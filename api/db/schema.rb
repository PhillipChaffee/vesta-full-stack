# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_23_052230) do

  create_table "borrowers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.integer "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "deleted_by_id"
    t.index ["deleted_by_id"], name: "index_borrowers_on_deleted_by_id"
    t.index ["phone_number"], name: "index_borrowers_on_phone_number", unique: true
  end

  create_table "borrowers_loans", id: false, force: :cascade do |t|
    t.integer "loan_id", null: false
    t.integer "borrower_id", null: false
  end

  create_table "loans", force: :cascade do |t|
    t.string "loan_officer_name"
    t.string "property_address"
    t.decimal "amount"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "deleted", default: false, null: false
    t.index ["property_address"], name: "index_loans_on_property_address", unique: true
  end

end
