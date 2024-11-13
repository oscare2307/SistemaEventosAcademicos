'use strict';
const { DataTypes } = require ('sequelize');
const sequelize = require('../index');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  usuarios.init({
    nombre_completo: DataTypes.STRING,
    Correo_electronico: DataTypes.STRING,
    usuario: DataTypes.STRING,
    contraseña: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};