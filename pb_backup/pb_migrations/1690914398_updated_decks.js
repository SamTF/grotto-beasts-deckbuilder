migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxff1ogl",
    "name": "author_name",
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
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // remove
  collection.schema.removeField("zxff1ogl")

  return dao.saveCollection(collection)
})
