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
        "Alternate Summoning",
        "Alternate Win Condition",
        "Any Tribal",
        "Aquatic Beast Tribal",
        "Aquatic Tribal Counter",
        "Beast Removal",
        "Beast Tutor",
        "Best Character",
        "Board Interaction",
        "Board Wipe",
        "Buff",
        "Byeah Tribal",
        "Card Attachment",
        "Card Draw",
        "Card Search",
        "Coin Flip",
        "Combo",
        "Crabcha Tribal",
        "Deathtouch",
        "Debuff",
        "Defender",
        "Dice Rolling",
        "Discard",
        "Discard Beast Tribal",
        "Discard Interaction",
        "Draw",
        "Epic Tribal",
        "Foodie Tribal",
        "Free Summoning",
        "Gambling",
        "Ghostly Tribal",
        "Grotto Removal",
        "Grotto Tribal",
        "Gruffling Tribal",
        "Hand Disruption",
        "Hand Size",
        "Haste",
        "Hexproof",
        "Jup Tribal",
        "Mill",
        "OP",
        "Phase Interaction",
        "Protection",
        "Rat Tribal",
        "Reviving",
        "Rock-Paper-Scissors",
        "Sacrifice",
        "Score Interaction",
        "Scoring",
        "Scry",
        "Sideline",
        "Singleton",
        "Sleepy",
        "Summoning Pool Interaction",
        "Tapping",
        "Thoughtseize",
        "Tie-Break",
        "Tribal",
        "Unique Beast tribal",
        "Vigilance",
        "Voltron",
        "Wish Counter",
        "Wish Tribal",
        "Wizard Tribal",
        "Worst Character",
        "Zoo"
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
})
