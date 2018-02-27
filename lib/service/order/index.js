const path = require('path');
const bookingRepo = require(path.join(libPath, 'repository', 'booking'));
const customerRepo = require(path.join(libPath, 'repository', 'customer'));
const itemRepo = require(path.join(libPath, 'repository', 'item'));
const customerService = require(path.join(libPath, 'service', 'customer'));
const ResDTO = require(path.join(appRoot, 'object', 'response-dto'));
const model = require(path.join(appRoot, 'model'));
const _ = require('lodash');

class OrderService {
  constructor() {
    // pass
  }

  /**
   * Find order by id.
   */
  getOrderById(id) {
    var resDTO = new ResDTO();

    return customerRepo.find().byIdwithAssociation(id, {
      model: model.booking,
      as: 'bookingList',
      include: {
        model: model.item,
        as: 'item'
      }
    }).then(result => {
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }

  /**
   * Create order.
   */
  async newOrder(order) {
    var resDTO = new ResDTO();

    var itemCheck = await itemRepo.find().byId(order.itemid).then(result => {
      if (!result) {
        resDTO.statusFail('item not found.');
      }
      return result ? true : false;
    });
    if (!itemCheck) {
      return resDTO;
    }

    var customerCheck = await customerService.diningCustomer.then(result => {
      var diningCustomer = result._data;
      var _customer = _.find(diningCustomer, (o) => {
        return o.customerid = order.customerid;
      });
      if (!_customer) {
        resDTO.statusFail('customer not found.');
      }
      return _customer ? true : false;
    });
    if (!customerCheck) {
      return resDTO;
    }

    return bookingRepo.create(order).then(result => {
      var resDTO = new ResDTO();
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }

  async sendMeal(id) {
    var order = await bookingRepo.find().byId(id);
    order.deliverytime = new Date();
    order.issend = 1;

    return bookingRepo.save(order).then(result => {
      var resDTO = new ResDTO();
      resDTO.statusOK();
      resDTO.data = result;
      return resDTO;
    });
  }
}


module.exports = new OrderService();