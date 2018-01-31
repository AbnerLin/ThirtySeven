var furnishSchema = {
    'type': 'object',
    'properties': {
        'name': { 'type': 'string' },
        'x': { 'type': 'number' },
        'y': { 'type': 'number' },
        'furnishclass': { 'type': 'string', 'format': 'uuid' }
    },
    'required': ['name', 'x', 'y', 'furnishclass']
};

var furnishArraySchema = {
    'type': 'array',
    'items': furnishSchema
};

var deleteFurnishSchema = {
    'type': 'array',
    'items': [
        { 'type': 'string', 'format': 'uuid' }
    ]
};

module.exports = {
    single: furnishSchema,
    array: furnishArraySchema,
    delete: deleteFurnishSchema
};