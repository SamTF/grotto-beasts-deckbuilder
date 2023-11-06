migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // remove
  collection.schema.removeField("cavmhuhe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "deg9ssqf",
    "name": "grottos",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "obrh5qqxypt9s5d",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 40,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cavmhuhe",
    "name": "card",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "obrh5qqxypt9s5d",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "number"
      ]
    }
  }))

  // remove
  collection.schema.removeField("deg9ssqf")

  return dao.saveCollection(collection)
})
