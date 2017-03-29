// grab db
const low = require('lowdb');
// instantiate db
const db = low('./db.json');

// default
db.defaults({ blogs: [] }).write();

const Bloglist = {};

TodoList.getItems = () => {
	return db.get('blogs').value();	
}



TodoList.createItem = (itemToCreate) => {
	db.get('blogs').push({
		id: Date.now(), 
		data: itemToCreate,
	}).write();	
}

TodoList.updateItem = (id, key, propertyToUpdate) => {
	db.get('blogs')
		  .find({ id })
		  .set(key, propertyToUpdate)
		  .write()	
}

TodoList.deleteItem = (id) => {
	db.get('blogs')
		.remove({id})
		.write();	
}

module.exports = Bloglist;

