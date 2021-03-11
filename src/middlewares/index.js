// MODIFICAR ...
const { verificaDatosLogin, verificaToken, verificaPermisoAdmin, verificaPermisoUser, verificaPermisoGuest} = require('./verificaAuth');
const { verificaDatosRegistroEmployee, verificaDatosUpdateEmployee, verificaParametrosPaginacion } = require('./verificaEmployee');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin, 
    verificaPermisoUser,
    verificaPermisoGuest,
    verificaDatosRegistroEmployee, 
    verificaDatosUpdateEmployee,
    verificaParametrosPaginacion    
};
