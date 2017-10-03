const path = require('path');
const customerRepo = require(path.join(__dirname, '..', 'repository', 'customer-repo'));
const mapService = require(path.join(__dirname, '..', 'map-service'));
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
        let responseDTO = new ResDTO();
        if (customerObj.name &&
            customerObj.phone &&
            customerObj.peoplecount &&
            customerObj.furnish) {

            // Check is furnish exists.
            var furnish = mapService.findFurnishById(customerObj.furnish);

            // Check furnish is using.
            var isUsing = false;
            Object.keys(this.customerBuffer).forEach(key => {
                if (this.customerBuffer[key].furnish == furnish.furnishid) {
                    isUsing = true;
                    return false;
                }
            });

            if (!furnish || isUsing) {
                responseDTO.statusFail();
                responseDTO.msg = 'Furnish not found or Furnish is using.';
                logger.error(responseDTO.msg);
                callback(responseDTO);
            } else {
                customerRepo.create(customerObj, (customer) => {
                    // Reload data for getting association.
                    let association = [{
                        model: model.furnish,
                        as: 'furnishObj'
                    }, {
                        model: model.booking,
                        as: 'bookingList'
                    }];

                    customerRepo.find().byIdwithAssociation(customer.customerid, association, (_customer) => {
                        responseDTO.statusOK();
                        responseDTO.data = _customer;

                        // Update Buffer.
                        this.customerBuffer[_customer.dataValues.customerid] = _customer.dataValues;
                        callback(responseDTO);
                    });
                });
            }
        } else {
            responseDTO.statusFail();
            responseDTO.msg = 'Data not complete.';
            logger.error(responseDTO.msg);
            callback(responseDTO);
        }
    }

    /**
     * Check out.
     */
    checkOut(customerId, callback) {
        //TODO use update method from generic-repo, which have to implement.
        // generic-repo save() not test yet.
    }

}

module.exports = new CustomerService();