"use strict";var Product=require("../models/product.model"),db=require("../db");module.exports={index:function(r,d){Product.find().then(function(e){d.render("products/index",{products:e,page:parseInt(r.query.page)||1})})}};