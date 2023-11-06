migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2jproscp",
    "name": "remix",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "629enptk",
    "name": "remix_of",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "8u70sdp3nuefwih",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // remove
  collection.schema.removeField("2jproscp")

  // remove
  collection.schema.removeField("629enptk")

  return dao.saveCollection(collection)
})
