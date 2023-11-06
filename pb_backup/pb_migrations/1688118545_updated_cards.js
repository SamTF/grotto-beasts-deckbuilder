migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
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
        "Aquatic",
        "Byeah",
        "Dragon",
        "Fairy",
        "Feathered",
        "Foodie",
        "Galactic",
        "Ghostly",
        "Gruffling",
        "Imp",
        "Insect",
        "Musical",
        "Mystic",
        "Plant",
        "Scout",
        "Shadow",
        "Stone",
        "Techtic",
        "Titanic",
        "Toxic",
        "Unspeakable"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d")

  // update
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
        "Aquatic",
        "Galactic",
        "Ghostly",
        "Shadow",
        "Stone",
        "Techtic",
        "Titanic"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
