'use strict'

const EmptyAsyncObject = require('./../async/EmptyAsyncObject')

class BuiltAsyncTreeByParsedCommands {
  constructor (parsedCommands, values) {
    this.parsedCommands = parsedCommands
    this.values = values
  }

  value () {
    return this.buildAsyncTree()
  }

  buildAsyncTree (curIndex = 1, tree = this.parsedCommands[0]) {
    if (this.parsedCommands.length === 0) {
      return new EmptyAsyncObject(this.values)
    }
    const curCommand = this.parsedCommands[curIndex]
    if (this.parsedCommands.length === curIndex) {
      return tree
    } else {
      tree.after(curCommand)
      return this.buildAsyncTree(this.parsedCommands, curIndex + 1, tree)
    }
  }
}

module.exports = BuiltAsyncTreeByParsedCommands
