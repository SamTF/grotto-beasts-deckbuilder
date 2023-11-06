migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  // update
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
        "Buff",
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

  // update
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
})
