const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vs:${password}@cluster0.mgpu06z.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    mongoose.connection.close()
    })
  })
} else if (process.argv.length === 5) {
  personName = process.argv[3]
  personNumber = process.argv[4]
  const person = new Person({
    name: personName,
    number: personNumber
  })
  person.save().then(result => {
    console.log(`Added ${personName} number ${personNumber} to phonebook`)
    mongoose.connection.close()
  })
}

