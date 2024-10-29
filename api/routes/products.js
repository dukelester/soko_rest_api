const express = require('express');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth');

const { getallProducts, getProductDetails,
    createProduct, updateProduct, deleteProduct } = require('../controllers/products');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/products')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const uploads = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter});

const router = express.Router();

router.get('/', getallProducts);

router.post('/', uploads.single('productImage'), checkAuth, createProduct);


router.get('/:productId', getProductDetails);


router.patch('/:productId', checkAuth, updateProduct);


router.delete('/:productId', checkAuth, deleteProduct);


module.exports = router;