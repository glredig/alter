var mongoose = require('mongoose');

/**
 *  Validation
 */
function validateNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
} 

module.exports = mongoose.model('Weighin', {
	created: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number,
    default: 0.0,
    required: 'weight cannot be blank',
    validate: [validateNumeric, 'weight must be a valid number']
  },
  date: {
    type: Date,
    default: Date.now
  }
})