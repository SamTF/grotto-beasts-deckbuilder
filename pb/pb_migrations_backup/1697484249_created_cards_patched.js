/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "58yxxxjnl2971a3",
    "created": "2023-10-16 19:24:09.851Z",
    "updated": "2023-10-16 19:24:09.851Z",
    "name": "cards_patched",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "q83ke7wg",
        "name": "number",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 200
        }
      },
      {
        "system": false,
        "id": "6tbuya4t",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "oppkctql",
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
      },
      {
        "system": false,
        "id": "w93zjp51",
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
            "Chimera",
            "Dragon",
            "Entrepreneur",
            "Fairy",
            "Feathered",
            "Foodie",
            "Fungal",
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
            "Sludge",
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
      },
      {
        "system": false,
        "id": "0dnricaq",
        "name": "power",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "fhujppgb",
        "name": "cost",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "cyiruvsq",
        "name": "goal",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": null
        }
      },
      {
        "system": false,
        "id": "9l22lahs",
        "name": "effect",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3etskcxy",
        "name": "rare",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "lm1yyls7",
        "name": "tags",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zril1got",
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
      },
      {
        "system": false,
        "id": "m1gknctm",
        "name": "epic",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "rltirqxr",
        "name": "flavour",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("58yxxxjnl2971a3");

  return dao.deleteCollection(collection);
})
