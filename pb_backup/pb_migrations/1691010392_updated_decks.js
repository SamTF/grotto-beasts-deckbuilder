migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  collection.updateRule = "author = @request.auth.id"
  collection.deleteRule = "author = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8u70sdp3nuefwih")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
