const { Products } = require("../models");

class ProductControllers {
  // Create a product baru
  static async createProduct(req, res, next) {
    try {
      const { name, price } = req.body;

      if (!name || !price) {
        throw { status: 400, message: "Name dan Price wajib diisi" };
      }

      const newProduct = await Products.create({ name, price });

      res.status(201).send({
        message: "Berhasil nambahin produk",
        product: newProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  // Ambil semua produk
  static async getAllProducts(req, res, next) {
    try {
      const productList = await Products.findAll({
        attributes: ["id", "name", "price", "createdAt", "updatedAt"],
      });

      res.status(200).send({
        message: "Data produk berhasil diambil",
        products: productList,
      });
    } catch (err) {
      next(err);
    }
  }

  // Ambil produk berdasarkan ID
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const productDetail = await Products.findByPk(id);

      if (!productDetail) {
        throw { status: 404, message: "Produk ga ketemu" };
      }

      res.status(200).send({
        message: "Detail produk berhasil diambil",
        product: productDetail,
      });
    } catch (err) {
      next(err);
    }
  }

  // Update produk
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;

      if (!name || !price) {
        throw { status: 400, message: "Name sama Price harus diisi" };
      }

      const targetProduct = await Products.findByPk(id);

      if (!targetProduct) {
        throw { status: 404, message: "Produk ga ketemu" };
      }

      await targetProduct.update({ name, price });

      res.status(200).send({
        message: "Produk berhasil diupdate",
        product: targetProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  // Hapus produk
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const targetProduct = await Products.findByPk(id);

      if (!targetProduct) {
        throw { status: 404, message: "Produk ga ada" };
      }

      await targetProduct.destroy();

      res.status(200).send({
        message: "Produk berhasil dihapus",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductControllers;
