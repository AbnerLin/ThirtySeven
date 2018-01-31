var orderSchema = {
    'type': 'object',
    'properties': {
        'volume': {
            'type': 'number',
            'minimum': 1
        },
        'customerid': {
            'type': 'string',
            'format': 'uuid'
        },
        'itemid': {
            'type': 'string',
            'format': 'uuid'
        }
    },
    'required': ['volume', 'customerid', 'itemid']
};

var orderArraySchema = {
    'type': 'array',
    'items': orderSchema
};

module.exports = {
    single: orderSchema,
    array: orderArraySchema
};