migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t50uptfb",
    "name": "subtype",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Galactic",
        "Techtic",
        "Titanic",
        "Shadow",
        "Ghostly",
        "Stone",
        "Aquatic"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // remove
  collection.schema.removeField("t50uptfb")

  return dao.saveCollection(collection)
})
