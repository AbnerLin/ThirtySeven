const path = require('path');
const customerRepo = require(path.join(__dirname, '..', 'repository', 'customer-repo'))
const model = require(path.join(__dirname, '..', '..', 'model'));
const logger = require(path.join(__dirname, '..', 'logger'));
const util = require('util');
const ResDTO = require(path.join(__dirname, '..', 'response-dto'));

/**
 * Customer module.
 */
class CustomerService {
    constructor() {
        this.customerBuffer = {};
    }

    /**
     * PostConstructor
     * @return Promise
     */
    init() {
        /** Load dining customer. */
        let diningCustomerLoader = customerRepo.find().clause({
            where: {
                checkouttime: null
            },
            include: [{
                model: model.furnish,
                as: 'furnishObj'
            }, {
                model: model.booking,
                as: 'bookingList'
            }]
        }, result => {
            result.forEach(customer => {
                logger.info(util.format('Load Customer ID: %s', customer.customerid));
                this.customerBuffer[customer.customerid] = customer.dataValues;
            });
        });

        return [diningCustomerLoader];
    }

    /**
     * Get dining customer list.
     */
    get diningCustomer() {
        let responseDTO = new ResDTO();
        responseDTO.statusOK();
        responseDTO.data = this.customerBuffer;
        return responseDTO;
    }

    /**
     * Check in.
     */
    checkIn(customerObj, callback) {

    }

    /**
     * Check out.
     */
    checkOut(customerId, callback) {

    }
}

module.exports = new CustomerService();