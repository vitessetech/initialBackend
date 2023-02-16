const getMsg = (modelName) => (c) => {
    const name = `${modelName[0].toLocaleUpperCase() + modelName.slice(1).slice(0,-1)}`
    switch(c) {
      case 'post' : return `${name} Added`
      case 'get' : return `${name} List Fetched`
      case 'get-single' : return `${name} fetched`
      case 'put' : return `${name} Updated`
      case 'delete' : return `${name} Deleted`
      case '404' : return `${name} Not Found`
    }
  }

module.exports = getMsg