var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AmmoSchema = require('../schemas/ammo');
var PlayerSchema = require('../schemas/player');
var UnitSchema = require('../schemas/unit');
var WeaponSchema = require('../schemas/weapon');

var UnitFiredSchema = new Schema({
  _type: {type: String, default: 'UnitFired'},
  _mission : { ref: 'Mission', type: Schema.Types.ObjectId },
  timestamp: Date,
  ammo: AmmoSchema,
  player: PlayerSchema,
  unit: UnitSchema,
  weapon: WeaponSchema,
}, {
  timestamps: true,
});

module.exports = mongoose.model('UnitFired', UnitFiredSchema, 'events');
