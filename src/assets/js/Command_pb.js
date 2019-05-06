/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf')
var goog = jspb
var global = Function('return this')()

goog.exportSymbol('proto.CommandType', null, global)
/**
 * @enum {number}
 */
proto.CommandType = {
  NONE: 0,
  AUTH: 1,
  PING: 2,
  PONG: 3,
  UPLOAD_DATA: 4,
  PUSH_DATA: 5,
  AUTH_BACK: 11,
  UPLOAD_DATA_BACK: 14,
  PUSH_DATA_BACK: 15
}

goog.object.extend(exports, proto)
