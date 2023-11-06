migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "urgxwego",
    "name": "effect",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // remove
  collection.schema.removeField("urgxwego")

  return dao.saveCollection(collection)
})
