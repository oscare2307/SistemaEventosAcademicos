module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [{
      nombre_completo: 'Oscar Julian Escobar Camaño',
      Correo_electronico: 'oscar.escobarcam@cun.edu.co',
      usuario: 'Oscar07',
      Contraseña:'12345',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
