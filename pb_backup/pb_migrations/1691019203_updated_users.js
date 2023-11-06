migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nngkkr2u",
    "name": "bookmarks",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "8u70sdp3nuefwih",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("nngkkr2u")

  return dao.saveCollection(collection)
})
