const orderSchema = {
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

const orderArraySchema = {
    'type': 'array',
    'items': orderSchema
};

module.exports = {
    single: orderSchema,
    array: orderArraySchema
};