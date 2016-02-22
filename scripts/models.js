db.models.drop();

//amaterasu
db.models.insert({
	"_id" : ObjectId("56cab1ea3090efb97676023a"),
	"name" : "news",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		},
		"description" : {
			"type" : "string",
			"required" : "true"
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.models.insert({
	"_id" : ObjectId("56cab25a3090efb97676023b"),
	"name" : "articles",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.models.insert({
	"_id" : ObjectId("56cab3953090efb97676023c"),
	"name" : "blog",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		},
		"excerpt" : {
			"type" : "string",
			"required" : "true"
		},
		"location" : {
			"type" : "string"
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//byakugan
db.models.insert({
	"_id" : ObjectId("56cab519ccb992ad77cfec99"),
	"name" : "express",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		},
		"pinned" : {
			"type" : "boolean",
			"required" : "true"
		}
	},
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.models.insert({
	"_id" : ObjectId("56cab5b2ccb992ad77cfec9a"),
	"name" : "articles",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		}
	},
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//chidoi
db.models.insert({
	"_id" : ObjectId("56cab60dccb992ad77cfec9b"),
	"name" : "tags",
	"attrs" : {
		"name" : {
			"type" : "string",
			"required" : "true"
		}
	},
	"app_id" : "56ca94ea9d1a04f258ad9bfe",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//doton
db.models.insert({
	"_id" : ObjectId("56cab65cccb992ad77cfec9c"),
	"name" : "categories",
	"attrs" : {
		"name" : {
			"type" : "string",
			"required" : "true"
		},
		"description" : {
			"type" : "string"
		}
	},
	"app_id" : "56ca95069d1a04f258ad9bff",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

//voltron
db.models.insert({
	"_id" : ObjectId("56cab6aeccb992ad77cfec9d"),
	"name" : "articles",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		},
		"description" : {
			"type" : "string"
		},
		"link" : {
			"type" : "string"
		}
	},
	"app_id" : "56ca95129d1a04f258ad9c00",
	"created_at" : new Date(),
	"updated_at" : new Date()
});

db.models.insert({
	"_id" : ObjectId("56cab6d3ccb992ad77cfec9e"),
	"name" : "vod",
	"attrs" : {
		"title" : {
			"type" : "string",
			"required" : "true"
		},
		"description" : {
			"type" : "string"
		},
		"link" : {
			"type" : "string"
		}
	},
	"app_id" : "56ca95129d1a04f258ad9c00",
	"created_at" : new Date(),
	"updated_at" : new Date()
});
