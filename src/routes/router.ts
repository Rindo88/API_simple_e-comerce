import express from 'express';
import { UserController } from '../controllers/user-controller';
import { authenticateMiddleware } from '../middlewares/authenticate-middleware';
import { decodeMiddleware } from '../middlewares/decode-middleware';
import { StoreController } from '../controllers/store-controller';
import { sellerAuthMiddleware } from '../middlewares/seller-auth-middleware';
import { AddressController } from '../controllers/address-controller';
import { ProductController } from '../controllers/product-controller';
import { CategoryController } from '../controllers/category-controller';
export const router = express.Router()

// // User
router.patch('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.update);
router.delete('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.delete);
router.delete('/api/users/logout', authenticateMiddleware, decodeMiddleware, UserController.logout);
router.get('/api/users/current', authenticateMiddleware, decodeMiddleware, UserController.get);

// // Store
router.post('/api/seller/stores', authenticateMiddleware, decodeMiddleware, StoreController.create);
router.get('/api/seller/stores', authenticateMiddleware, decodeMiddleware, StoreController.get);
router.delete('/api/seller/stores', authenticateMiddleware, decodeMiddleware, StoreController.delete);
router.patch('/api/seller/stores', authenticateMiddleware, decodeMiddleware, StoreController.update);

// // Address
// sellers
router.post('/api/seller/adddresses', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, AddressController.create);
router.get('/api/seller/adddresses', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, AddressController.getBySeller);
router.patch('/api/seller/adddresses', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, AddressController.updateBySeller);
router.delete('/api/seller/adddresses', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, AddressController.deleteBySeller);
// users
router.post('/api/adddresses', authenticateMiddleware, decodeMiddleware, AddressController.create);
router.get('/api/adddresses', authenticateMiddleware, decodeMiddleware, AddressController.getByUser);
router.patch('/api/adddresses', authenticateMiddleware, decodeMiddleware, AddressController.updateByUser);
router.delete('/api/adddresses', authenticateMiddleware, decodeMiddleware, AddressController.deleteByUser);

// // products
// seller
router.post('/api/seller/products', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, ProductController.create);
router.get('/api/products', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, ProductController.getSellerProducts);
router.patch('/api/products/:id(\\d+)', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, ProductController.updateProductSeller);
router.delete('/api/products/:id(\\d+)', authenticateMiddleware, decodeMiddleware, sellerAuthMiddleware, ProductController.deleteProductSeller);

// users
router.get('/api/products/:id(\\d+)', authenticateMiddleware, decodeMiddleware, ProductController.get);
router.get('/api/products', authenticateMiddleware, decodeMiddleware, ProductController.getProducts);


// // categories
router.get('/api/products/:id(\\d+)', authenticateMiddleware, decodeMiddleware, CategoryController.get);
router.get('/api/products', authenticateMiddleware, decodeMiddleware, CategoryController.getCategories);