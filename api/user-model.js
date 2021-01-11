const shortid = require('shortid')

let users = [
  { id: shortid.generate(), name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane." },
  { id: shortid.generate(), name: 'John Doe', bio: "Is Tarzan's Wife, not another John." },
]

module.exports = {
  findAll() {
    // SELECT * FROM users;
    return Promise.resolve(users)
  },

  findById(id) {
    // SELECT * FROM users WHERE id = 1;
    const user = users.find(d => d.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    // INSERT INTO users (id, name, bio) VALUES ('xyz', 'Foo', 'Foo');
    const newUser = { id: shortid.generate(), name, bio }
    users.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    // UPDATE users SET name = 'Foo', bio = 'Foo' WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : u)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    // DELETE FROM users WHERE id = 1;
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}