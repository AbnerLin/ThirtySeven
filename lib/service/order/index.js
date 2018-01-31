const path = require('path');
const bookingRepo = require(path.join(libPath, 'repository', 'booking'));
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const model = require(path.join(appRoot, 'model'));

class OrderService {
    constructor() {
        // pass
    }

    /**
     * Find order by id.
     */
    getOrderById(id) {
        var resDTO = new ResDTO();

        return bookingRepo.find().byIdwithAssociation(id, {
            model: model.item,
            as: 'item'
        }).then(result => {
            resDTO.statusOK();
            resDTO.data = result;
            return resDTO;
        });
    }
}


module.exports = new OrderService();