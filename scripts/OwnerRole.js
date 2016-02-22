db.roles.insert({
  _id: "0",
  appId: "0",
  name: "owner",
  description: "owner",
  permissions: {
    draft: {
      canAdd: true,
      canEdit: true,
      canView: true,
      canPublish: true,
      canDelete: true,
      canArchive: true
    },
    submitted: {
      canAdd: true,
      canEdit: true,
      canView: true,
      canPublish: true,
      canDelete: true,
      canArchive: true
    },
    published: {
      canAdd: true,
      canEdit: true,
      canView: true,
      canPublish: true,
      canDelete: true,
      canArchive: true
    },
    archived: {
      canAdd: true,
      canEdit: true,
      canView: true,
      canPublish: true,
      canDelete: true,
      canArchive: true
    },
  },
  manageApps: true,
  manageModels: true,
  manageImages: true
})
