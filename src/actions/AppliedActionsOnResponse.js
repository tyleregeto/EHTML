'use strict'

const { AsyncObject } = require('./../cutie/exports')
const ParsedActions = require('./ParsedActions')
const BuiltAsyncTreeByParsedActions = require('./BuiltAsyncTreeByParsedActions')

class AppliedActionsOnResponse extends AsyncObject {
  constructor (tagName, resName, res, actions) {
    super(tagName, resName, res, actions)
  }

  syncCall () {
    return (tagName, resName, res, actions) => {
      new BuiltAsyncTreeByParsedActions(
        new ParsedActions(
          actions,
          tagName,
          res,
          resName
        ).value()
      ).value().call()
    }
  }
}

module.exports = AppliedActionsOnResponse
