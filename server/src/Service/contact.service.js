const db = require("../mysql.config");

class contactServices {
  static async add(data) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `INSERT INTO user SET ?`;
        db.query(sql, data, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM user ORDER BY id DESC`;
        db.query(sql, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static async getOne(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `SELECT * FROM user WHERE id = ?`;
        db.query(sql, id, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `UPDATE user SET ? WHERE id = ?`;
        db.query(sql, [data, id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      try {
        const sql = `DELETE FROM user WHERE id = ?`;
        db.query(sql, id, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = contactServices;
