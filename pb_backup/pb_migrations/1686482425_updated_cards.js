migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // remove
  collection.schema.removeField("toxwbefc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzwqndqo",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Challenger",
        "Beast",
        "Grotto",
        "Wish"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "toxwbefc",
    "name": "type",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("uzwqndqo")

  return dao.saveCollection(collection)
})
