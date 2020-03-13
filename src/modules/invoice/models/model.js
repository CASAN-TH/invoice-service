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
        type: Date,
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
        type: Date
    },
    delivery_date: {
        type: Date,
        required: 'delivery_date require'
    },
    items: {
        type: [{
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
        }]
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

InvoiceSchema.pre("save", function (next) {
    const model = mongoose.model("Invoice", InvoiceSchema);
    let invoice = this;

    invoice.total.total_amount = 0;
    invoice.total.tax = 0;
    invoice.items.forEach(function (item) {
        invoice.total.total_amount += (item.qty * item.unit_price) - item.discount;
        invoice.total.tax += (item.qty * item.unit_price) * (item.tax / 100);
    })
    invoice.total.price_untax = invoice.total.total_amount - invoice.total.discount;
    invoice.total.total_amount_tax = invoice.total.price_untax + invoice.total.tax;
    
    if (invoice.isNew) {
        model.find({ doc_date: { $gte: new Date(invoice.doc_date.getFullYear(), invoice.doc_date.getMonth(), 1), $lte: new Date(invoice.doc_date.getFullYear(), invoice.doc_date.getMonth() + 1, 1) } }, function (err, res) {
            if (err) {
                next(err);
            }
            if (res.length === 0) {
                invoice.doc_no = `${invoice.doc_date.getFullYear()}-${(invoice.doc_date.getMonth() + 1).toString().padStart(2, "0")}-001`
            } else {
                const maxno = res.length;
                invoice.doc_no = `${invoice.doc_date.getFullYear()}-${(invoice.doc_date.getMonth() + 1).toString().padStart(2, "0")}-${(maxno + 1).toString().padStart(3, "0")}`
            }

            next();
        })

    } else {
        next();
    }
})

mongoose.model("Invoice", InvoiceSchema);