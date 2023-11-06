migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wqnltae6",
    "name": "challenger",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "obrh5qqxypt9s5d",
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
  collection.schema.removeField("wqnltae6")

  return dao.saveCollection(collection)
})
