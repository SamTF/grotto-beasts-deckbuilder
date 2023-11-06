migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pcty7gct",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzwqndqo",
    "name": "type",
    "type": "select",
    "required": true,
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pcty7gct",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3wogdyl1",
    "name": "image",
    "type": "file",
    "required": false,
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
