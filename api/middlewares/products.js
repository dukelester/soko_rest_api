const productsMiddleware = (req, res, next) => {
    Product.find().then((products) => {
        res.status(200).json(products)
    }).catch((error) => (
        res.json({error: error.message})
    ));
}


exports = module.productsMiddleware;