migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mzb8fott",
    "name": "number",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 1,
      "max": 200
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // remove
  collection.schema.removeField("mzb8fott")

  return dao.saveCollection(collection)
})
