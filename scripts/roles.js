//amaterasu
db.roles.insert([{
	"_id" : ObjectId("56ca9740239b4b156fe7f8a8"),
	"name" : "editor",
	"description" : "editor",
	"permission" : {
		"draft" : {
			"canEdit" : true,
			"canView" : true
		},
		"submitted" : {
			"canDelete" : true,
			"canArchive" : true
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"manage_models" : true,
	"manage_images" : true,
	"manage_apps" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9740239b4b156fe7f8a9"),
	"name" : "contributor",
	"description" : "contributor",
	"permission" : {
		"draft" : {
			"canAdd" : true,
			"canEdit" : true,
			"canView" : true,
			"canDelete" : true
		},
		"submitted" : {
			"canView" : true
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"manage_images" : true,
	"manage_apps" : false,
	"manage_models" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9740239b4b156fe7f8aa"),
	"name" : "publisher",
	"description" : "publisher",
	"permission" : {
		"submitted" : {
			"canView" : true,
			"canPublish" : true
		},
		"published" : {
			"canArchive" : true
		}
	},
	"app_id" : "56ca94cd9d1a04f258ad9bfc",
	"manage_apps" : false,
	"manage_models" : false,
	"manage_images" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
}]);

//byakugan
db.roles.insert([{
	"_id" : ObjectId("56ca97f5239b4b156fe7f8ad"),
	"name" : "editor",
	"description" : "editor",
	"permission" : {
		"draft" : {
			"canEdit" : true,
			"canView" : true
		},
		"submitted" : {
			"canDelete" : true,
			"canArchive" : true
		}
	},
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"manage_models" : true,
	"manage_images" : true,
	"manage_apps" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca97f5239b4b156fe7f8ae"),
	"name" : "contributor",
	"description" : "contributor",
	"permission" : {
		"draft" : {
			"canAdd" : true,
			"canEdit" : true,
			"canView" : true,
			"canDelete" : true
		},
		"submitted" : {
			"canView" : true
		}
	},
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"manage_images" : true,
	"manage_apps" : false,
	"manage_models" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca97f5239b4b156fe7f8af"),
	"name" : "publisher",
	"description" : "publisher",
	"permission" : {
		"submitted" : {
			"canView" : true,
			"canPublish" : true
		},
		"published" : {
			"canArchive" : true
		}
	},
	"app_id" : "56ca94dd9d1a04f258ad9bfd",
	"manage_apps" : false,
	"manage_models" : false,
	"manage_images" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
}]);

//chidori
db.roles.insert([{
	"_id" : ObjectId("56ca9877239b4b156fe7f8b2"),
	"name" : "editor",
	"description" : "editor",
	"permission" : {
		"draft" : {
			"canEdit" : true,
			"canView" : true
		},
		"submitted" : {
			"canDelete" : true,
			"canArchive" : true
		}
	},
	"app_id" : "56ca94ea9d1a04f258ad9bfe",
	"manage_models" : true,
	"manage_images" : true,
	"manage_apps" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9877239b4b156fe7f8b3"),
	"name" : "contributor",
	"description" : "contributor",
	"permission" : {
		"draft" : {
			"canAdd" : true,
			"canEdit" : true,
			"canView" : true,
			"canDelete" : true
		},
		"submitted" : {
			"canView" : true
		}
	},
	"app_id" : "56ca94ea9d1a04f258ad9bfe",
	"manage_images" : true,
	"manage_apps" : false,
	"manage_models" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9877239b4b156fe7f8b4"),
	"name" : "publisher",
	"description" : "publisher",
	"permission" : {
		"submitted" : {
			"canView" : true,
			"canPublish" : true
		},
		"published" : {
			"canArchive" : true
		}
	},
	"app_id" : "56ca94ea9d1a04f258ad9bfe",
	"manage_apps" : false,
	"manage_models" : false,
	"manage_images" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
}]);

//doton
db.roles.insert([{
	"_id" : ObjectId("56ca98b4239b4b156fe7f8b7"),
	"name" : "editor",
	"description" : "editor",
	"permission" : {
		"draft" : {
			"canEdit" : true,
			"canView" : true
		},
		"submitted" : {
			"canDelete" : true,
			"canArchive" : true
		}
	},
	"app_id" : "56ca95069d1a04f258ad9bff",
	"manage_models" : true,
	"manage_images" : true,
	"manage_apps" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca98b4239b4b156fe7f8b8"),
	"name" : "contributor",
	"description" : "contributor",
	"permission" : {
		"draft" : {
			"canAdd" : true,
			"canEdit" : true,
			"canView" : true,
			"canDelete" : true
		},
		"submitted" : {
			"canView" : true
		}
	},
	"app_id" : "56ca95069d1a04f258ad9bff",
	"manage_images" : true,
	"manage_apps" : false,
	"manage_models" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca98b4239b4b156fe7f8b9"),
	"name" : "publisher",
	"description" : "publisher",
	"permission" : {
		"submitted" : {
			"canView" : true,
			"canPublish" : true
		},
		"published" : {
			"canArchive" : true
		}
	},
	"app_id" : "56ca95069d1a04f258ad9bff",
	"manage_apps" : false,
	"manage_models" : false,
	"manage_images" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
}]);

//voltron
db.roles.insert([{
	"_id" : ObjectId("56ca9902239b4b156fe7f8bc"),
	"name" : "editor",
	"description" : "editor",
	"permission" : {
		"draft" : {
			"canEdit" : true,
			"canView" : true
		},
		"submitted" : {
			"canDelete" : true,
			"canArchive" : true
		}
	},
	"app_id" : "56ca95129d1a04f258ad9c00",
	"manage_models" : true,
	"manage_images" : true,
	"manage_apps" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9902239b4b156fe7f8bd"),
	"name" : "contributor",
	"description" : "contributor",
	"permission" : {
		"draft" : {
			"canAdd" : true,
			"canEdit" : true,
			"canView" : true,
			"canDelete" : true
		},
		"submitted" : {
			"canView" : true
		}
	},
	"app_id" : "56ca95129d1a04f258ad9c00",
	"manage_images" : true,
	"manage_apps" : false,
	"manage_models" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
},
{
	"_id" : ObjectId("56ca9902239b4b156fe7f8be"),
	"name" : "publisher",
	"description" : "publisher",
	"permission" : {
		"submitted" : {
			"canView" : true,
			"canPublish" : true
		},
		"published" : {
			"canArchive" : true
		}
	},
	"app_id" : "56ca95129d1a04f258ad9c00",
	"manage_apps" : false,
	"manage_models" : false,
	"manage_images" : false,
	"created_at" : new Date(),
	"updated_at" : new Date()
}]);
