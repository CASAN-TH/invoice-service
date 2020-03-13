'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var InvoiceSchema = new Schema({
    customer_no: {
        type: String
    },
    customer_name: {
        type: String
    },
    doc_date: {
        type: String,
        required: 'docdate require'
    },
    contact_name: {
        type: String
    },
    credit: {
        type: Number,
        required: 'credit require'
    },
    order_no: {
        type: String
    },
    order_date: {
        type: String
    },
    delivery_date: {
        type: String,
        required: 'delivery_date require'
    },
    items: {
        type: {
            item_no: {
                type: Number,
                required: 'item_no require'
            },
            item_name: {
                type: String,
                required: 'item_name require'
            },
            unitcount: {
                type: String,
                required: 'unitcount require'
            },
            qty: {
                type: Number,
                required: 'qty require'
            },
            unit_price: {
                type: Number,
                required: 'unit_price require'
            },
            discount: {
                type: Number
            },
            tax: {
                type: Number
            },
            total_item: {
                type: Number
            }
        }
    },
    total: {
        type: {
            total_amount: {
                type: Number
            },
            discount: {
                type: Number
            },
            price_untax: {
                type: Number
            },
            tax: {
                type: Number
            },
            total_amount_tax: {
                type: Number
            }
        }
    
    }
    ,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Invoice", InvoiceSchema);