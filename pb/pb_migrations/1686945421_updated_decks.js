migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "deg9ssqf",
    "name": "cards_relational",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "deg9ssqf",
    "name": "cards",
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
})
