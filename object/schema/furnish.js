const furnishSchema = {
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'x': { 'type': 'number' },
    'y': { 'type': 'number' },
    'furnishclass': { 'type': 'string', 'format': 'uuid' }
  },
  'required': ['name', 'x', 'y', 'furnishclass']
};

const furnishArraySchema = {
  'type': 'array',
  'items': furnishSchema
};

const updateFurnishSingleSchema = {
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'x': { 'type': 'number' },
    'y': { 'type': 'number' }
  },
  'required': ['name', 'x', 'y']
};

const deleteFurnishArraySchema = {
  'type': 'array',
  'items': [
    { 'type': 'string', 'format': 'uuid' }
  ]
};

module.exports = {
  postArray: furnishArraySchema,
  deleteArray: deleteFurnishArraySchema,
  updateSingle: updateFurnishSingleSchema
};