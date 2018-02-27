const customerSchema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'phone': {
      'type': 'string'
    },
    'peoplecount': {
      'type': 'number',
      'minimum': 1
    },
    'furnish': {
      'type': 'string',
      'format': 'uuid'
    }
  },
  'required': ['name', 'furnish', 'peoplecount']
};

const customerArraySchema = {
  'type': 'array',
  'items': customerSchema
};

module.exports = {
  single: customerSchema,
  array: customerArraySchema
};