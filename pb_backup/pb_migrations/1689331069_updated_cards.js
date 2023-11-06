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
        "Angelic",
        "Aquatic",
        "Byeah",
        "Chef",
        "Dragon",
        "Entrepreneur",
        "Fairy",
        "Feathered",
        "Foodie",
        "Galactic",
        "Geode",
        "Ghostly",
        "Glass",
        "Glyph",
        "Gruffling",
        "Icy",
        "Imp",
        "Insect",
        "Lucky",
        "Mold",
        "Musical",
        "Mystic",
        "Parasite",
        "Plant",
        "Plush",
        "Puppet",
        "Rat",
        "Roc",
        "Scout",
        "Shadow",
        "Sherrif",
        "Slude",
        "Soggy",
        "Spider",
        "Stone",
        "Surprise",
        "Techtic",
        "Titanic",
        "Toxic",
        "Trinket",
        "Unspeakable",
        "Weird",
        "Wizard"
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
        "Angelic",
        "Aquatic",
        "Byeah",
        "Chef",
        "Dragon",
        "Entrepreneur",
        "Fairy",
        "Feathered",
        "Foodie",
        "Galactic",
        "Geode",
        "Ghostly",
        "Glass",
        "Glyph",
        "Gruffling",
        "Icy",
        "Imp",
        "Insect",
        "Lucky",
        "Musical",
        "Mystic",
        "Parasite",
        "Plant",
        "Plush",
        "Puppet",
        "Rat",
        "Roc",
        "Scout",
        "Shadow",
        "Sherrif",
        "Slude",
        "Soggy",
        "Spider",
        "Stone",
        "Surprise",
        "Techtic",
        "Titanic",
        "Toxic",
        "Trinket",
        "Unspeakable",
        "Weird",
        "Wizard"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
