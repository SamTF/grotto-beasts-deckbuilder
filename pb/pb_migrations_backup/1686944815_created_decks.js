migrate((db) => {
  const collection = new Collection({
    "id": "8u70sdp3nuefwih",
    "created": "2023-06-16 19:46:55.446Z",
    "updated": "2023-06-16 19:46:55.446Z",
    "name": "decks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "htm1m1gt",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 32,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "n24rtven",
        "name": "author",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "username"
          ]
        }
      },
      {
        "system": false,
        "id": "cavmhuhe",
        "name": "card",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "obrh5qqxypt9s5d",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "number"
          ]
        }
      },
      {
        "system": false,
        "id": "pafazkqi",
        "name": "cards",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih");

  return dao.deleteCollection(collection);
})
