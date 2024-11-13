'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clientes.init({
    Correo_electronico: DataTypes.STRING,
    contraseña: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clientes',
    tableName: 'clientes',
  });
  return clientes;
};