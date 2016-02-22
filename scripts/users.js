db.users.drop();

db.users.insert({
	"_id" : ObjectId("56ca92767f33b4a176a0f6af"),
	"auth_id" : "12345",
	"auth_type" : "fake",
	"display_name" : "Juan Sanchez",
	"first_name" : "Juan",
	"last_name" : "Sanchez",
	"email" : "fake@fake.com",
	"create_at": new Date(),
	"updaed_at": new Date()
});

db.users.insert({
	"_id" : ObjectId("56ca92ab7f33b4a176a0f6b0"),
	"auth_id" : "23456",
	"auth_type" : "fake",
	"display_name" : "Sarah Balles",
	"first_name" : "Sarah",
	"last_name" : "Balles",
	"email" : "fake1@fake.com",
	"create_at": new Date(),
	"updaed_at": new Date()
});

db.users.insert({
	"_id" : ObjectId("56ca92d47f33b4a176a0f6b1"),
	"auth_id" : "34567",
	"auth_type" : "fake",
	"display_name" : "Fatima Mojica",
	"first_name" : "Fatima",
	"last_name" : "Mojica",
	"email" : "fake2@fake.com",
	"create_at": new Date(),
	"updaed_at": new Date()
});
