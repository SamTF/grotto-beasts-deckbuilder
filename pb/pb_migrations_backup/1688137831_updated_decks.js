migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // remove
  collection.schema.removeField("deg9ssqf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5v4uyykg",
    "name": "tags",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 6,
      "values": [
        "Card Draw",
        "Coin Flipping",
        "Dice Rolling",
        "Discard Interaction",
        "Foodie Tribal",
        "Grotto Tribal"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // add
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

  // remove
  collection.schema.removeField("5v4uyykg")

  return dao.saveCollection(collection)
})
