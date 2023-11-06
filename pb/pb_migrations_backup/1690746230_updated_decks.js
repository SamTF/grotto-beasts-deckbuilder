migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n24rtven",
    "name": "author",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "username"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pafazkqi",
    "name": "cards_json",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n24rtven",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "username"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pafazkqi",
    "name": "cards_json",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
