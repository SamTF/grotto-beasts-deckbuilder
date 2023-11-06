migrate((db) => {
  const collection = new Collection({
    "id": "obrh5qqxypt9s5d",
    "created": "2023-06-11 11:18:47.371Z",
    "updated": "2023-06-11 11:18:47.371Z",
    "name": "cards",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "7atswyo6",
        "name": "rare",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "toxwbefc",
        "name": "type",
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
        "id": "cjhynmv4",
        "name": "cost",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "1zq4hbjn",
        "name": "power",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "bvgkm7t8",
        "name": "score",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "rsjzgdkp",
        "name": "tags",
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
  const collection = dao.findCollectionByNameOrId("obrh5qqxypt9s5d");

  return dao.deleteCollection(collection);
})
