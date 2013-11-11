# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Story.delete_all

u1 = User.create(name:"Travis", email: "vanderhoop@me.com", phone: "262-389-0209")
u2 = User.create(name:"Jorge", email: "jorgeecolindres@gmail.com", phone: "305-815-7763")
u3 = User.create(name:"Josh", email: "oynickj@gmail.com", phone: "941-313-5770")
u4 = User.create(name:"James", email: "jrothpearl@gmail.com", phone: "516-729-7698")

s1 = Story.create(as_a:"developer in training", i_want_to:"develop an app that helps me systematically break down my goals into small, actionable tasks", so_i_can:"use said app to efficiently knock off my goals")

u1.stories << s1
