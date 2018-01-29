const path = require('path');
const customerRepo = require(path.join(libPath, 'repository', 'customer'));
const mapService = require(path.join(libPath, 'service', 'map'));
const model = require(path.join(appRoot, 'model'));
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));

/**
 * Customer module.
 */
class CustomerService {

    constructor() {}

    /**
     * Get dining customer list.
     */
    get diningCustomer() {
        return customerRepo.find().clause({
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
        }).then(result => {
            var resDTO = new ResDTO();
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    /**
     * Check in.
     */
    async checkIn(customer) {
        var resDTO = new ResDTO();

        var furnishCheck = await mapService.getFurnishById(customer.furnishId).then(result => {
            if (!result) {
                resDTO.statusFail('furnish not found.');
            }
            return result ? true : false;
        });
        if (!furnishCheck)
            return resDTO;

        var furnishInUseCheck = await customerRepo.find().clause({
            where: {
                furnish: customer.furnishId
            }
        });
        if (furnishInUseCheck.length > 0) {
            resDTO.statusFail('furnish in use.');
            return resDTO;
        }

        var dataRow = {
            name: customer.name,
            phone: customer.phone,
            peoplecount: customer.peoplecount,
            furnish: customer.furnishId
        };

        return customerRepo.create(dataRow).then(result => {
            var resDTO = new ResDTO();
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }

    /**
     * Check out.
     */
    async checkOut(customerId) {
        var customer = await customerRepo.find().byId(customerId);
        customer.checkouttime = new Date();
        return customerRepo.save(customer).then(result => {
            var resDTO = new ResDTO();
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }
}

module.exports = new CustomerService();