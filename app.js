const yargs = require('yargs')
const {
  saveData,
  listData,
  detailData,
  deleteData
} = require('./contacts')

yargs.command({
  command: 'add',
  describe: 'add new contact',
  builder: {
    name: {
      describe: 'contact name',
      demandOption: true,
      type: 'string'
    },
    phone: {
      describe: 'contact phone number',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'contact email address',
      demandOption: false,
      type: 'string'
    }
  },
  handler(argv) {
    saveData(argv.name, argv.email, argv.phone)
  }
})
.demandCommand()


yargs.command({
  command: 'list',
  describe: 'show contact list',
  handler() {
    listData()
  }
})

yargs.command({
  command: 'detail',
  describe: 'show detail contact base on given name',
  builder: {
    name: {
      describe: 'contact name looked for',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailData(argv.name)
  }
})

yargs.command({
  command: 'delete',
  describe: 'delete contact base on given name',
  builder: {
    name: {
      describe: 'contact name deleted to',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteData(argv.name)
  }
})

yargs.parse()

process.on('uncaughtException', function (error) {
  console.error(error.stack)
})

// const { writeInput, saveData } = require('./contacts')

// const main = async () => {
//   const name = await writeInput('Enter your name\t\t:')
//   const email = await writeInput('Enter your email\t:')
//   const phone = await writeInput('Enter your phone number\t:')

//   saveData(name, email, phone)
// }

// main()