/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3wogdyl1",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": [
        "256x360"
      ],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3wogdyl1",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg",
        "image/webp"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
