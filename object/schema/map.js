const mapSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'width': {
      'type': 'number',
      'minimum': 1
    },
    'height': {
      'type': 'number',
      'minimum': 1
    }
  },
  'required': ['name', 'width', 'height']
};

const mapArraySchema = {
  'type': 'array',
  'items': mapSchema
};

module.exports = {
  single: mapSchema,
  array: mapArraySchema
};