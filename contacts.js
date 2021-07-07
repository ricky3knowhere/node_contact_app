const fs = require('fs')
const readLine = require('readline')
const val = require('validator')
const chalk = require('chalk')

//Create input output instantiation
const rl = readLine.createInterface({
  'input': process.stdin,
  'output': process.stdout
})

//Check folder eather exist or not

if (!fs.existsSync('./data')) {
  fs.mkdirSync('./data')
}
//Check file eather exist or not

if (!fs.existsSync('./data/contacts.json')) {
  fs.writeFileSync('./data/contacts.json', '[]', 'utf-8')
}

// Input getter
const writeInput = (qst) => {
  return new Promise((resolve, reject) => {
    rl.question(qst, (data) => {
      resolve(data)
    })
  })
}


//Data.json Caller
const getData = () => {
  let file = fs.readFileSync('data/contacts.json', 'utf-8')
  let data = JSON.parse(file)

  return data
}



//Save data function
const saveData = (name, email, phone) => {

  let temp = {
    name,
    email,
    phone
  }

  const data = getData()


  if (!val.isMobilePhone(phone, 'id-ID')) {
    console.log(chalk.inverse.magenta.bold('Invalid phone number...'))
    process.exit(1)
  }
  if (email) {
    if (!val.isEmail(email)) {
      if (data.find(contact => contact.email === email)) {
        console.log(chalk.inverse.magenta.bold('Email has already been registered...'))
        process.exit(1)
      }
      console.log(chalk.inverse.magenta.bold('Invalid email format...'))
      process.exit(1)
    }
  }



  data.push(temp)

  fs.writeFileSync('data/contacts.json', JSON.stringify(data))
  rl.close()

  console.log(chalk.blueBright.inverse.bold('\nData success inserted...\n'))
  listData()
  
}

//List data function
const listData = () => {
  const data = getData()

  console.log(chalk.greenBright.inverse.bold('\n<<=== Contact List ===>>\n'))

  data.forEach((e, i) => {
    console.log(`${i+1}. ${e.name}\t ==>> ${e.phone}`)
  })

  process.exit(1)

}

//Detail data function
const detailData = (name) => {
  const data = getData()

  const contact = data.find((e) => e.name.toLowerCase() === name.toLowerCase())

  if (contact) {
    console.log(chalk.yellow.inverse.bold('\n<<=== Contact Details ===>>\n'))

    console.log(`Name\t: ${contact.name}`)
    console.log(`Phone\t: ${contact.phone}`)

    if (contact.email) {
      console.log(`Email\t: ${contact.email}`)
    }

    process.exit(1)

  } else {
    console.log(chalk.magenta.inverse.bold(`\nContact with ${name} name is not found\n`))
    process.exit(1)

  }
}

//Delete data function
const deleteData = (name) => {
  const data = getData()

  const newData = data.filter((e) => e.name.toLowerCase() !== name.toLowerCase())

  if (data.length !== newData.length) {

    fs.writeFileSync('data/contacts.json', JSON.stringify(newData))

    console.log(chalk.blueBright.inverse.bold(`\nContact with ${name} name is success deleted...\n`))

    listData()
    process.exit(1)
  } else {
    console.log(chalk.magenta.inverse.bold(`\nContact with ${name} name is not found\n`))
    process.exit(1)

  }
}

process.on('uncaughtException', function (error) {
  console.log(error.stack);
})

module.exports = {
  saveData,
  listData,
  detailData,
  deleteData
}