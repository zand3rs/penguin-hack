db.entries.drop();

//amaterasu
db.entries.insert({
	"_id" : ObjectId("56cab7ea550021de785fe59e"),
	"attrs" : {
		"title" : "news 1",
		"description" : "news 1 desc"
	},
	"tags" : [
		""
	],
	"categories" : [ ],
	"status" : "draft",
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"model_id" : "56cab1ea3090efb97676023a",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.entries.insert({
	"_id" : ObjectId("56cab98202d84a187960eab6"),
	"attrs" : {
		"title" : "sample article"
	},
	"status" : "submitted",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"model_id" : "56cab25a3090efb97676023b",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.entries.insert({
	"_id" : ObjectId("56cab9ab02d84a187960eab7"),
	"attrs" : {
		"title" : "blog 1",
		"excerpt" : "blog 1 excerpt",
		"location" : "location"
	},
	"status" : "draft",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"model_id" : "56cab3953090efb97676023c",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//byakugan
db.entries.insert({
	"_id" : ObjectId("56cab9e202d84a187960eab8"),
	"attrs" : {
		"title" : "express 1",
		"pinned" : "true"
	},
	"status" : "draft",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"model_id" : "56cab519ccb992ad77cfec99",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.entries.insert({
	"_id" : ObjectId("56cabbd9bf6fa0967966e6b3"),
	"attrs" : {
		"title" : "article 1"
	},
	"status" : "submitted",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"model_id" : "56cab5b2ccb992ad77cfec9a",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//chidori
db.entries.insert({
	"_id" : ObjectId("56caba3d02d84a187960eaba"),
	"attrs" : {
		"name" : "tag 1"
	},
	"status" : "published",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca94ea9d1a04f258ad9bfe",
	"model_id" : "56cab60dccb992ad77cfec9b",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//doton
db.entries.insert({
	"_id" : ObjectId("56caba7002d84a187960eabb"),
	"attrs" : {
		"name" : "category 1",
		"description" : "category 1 description"
	},
	"status" : "draft",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca95069d1a04f258ad9bff",
	"model_id" : "56cab65cccb992ad77cfec9c",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//voltron
db.entries.insert({
	"_id" : ObjectId("56cabab802d84a187960eabc"),
	"attrs" : {
		"title" : "article 1",
		"description" : "article 1 description",
		"link" : "sample link"
	},
	"status" : "draft",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca95129d1a04f258ad9c00",
	"model_id" : "56cab6aeccb992ad77cfec9d",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.entries.insert({
	"_id" : ObjectId("56cabae302d84a187960eabd"),
	"attrs" : {
		"title" : "vod 1",
		"description" : "vod 1 description",
		"link" : "sample link vod"
	},
	"status" : "submitted",
	"tags" : [
		""
	],
	"categories" : [ ],
	"app_id" : "56ca95129d1a04f258ad9c00",
	"model_id" : "56cab6d3ccb992ad77cfec9e",
	"created_at" : new Date(),
	"updated_at" : new Date()
});
