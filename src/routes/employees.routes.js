const router = require('express').Router();
const employeeCtrl = require('../controllers/employees.controller');
const { verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion, verificaDatosRegistroEmployee, verificaDatosUpdateEmployee } = require('../middlewares/index');

router.get('/', [verificaToken, verificaPermisoAdmin, verificaParametrosPaginacion], employeeCtrl.getEmployees);
router.get('/:id', [verificaToken, verificaPermisoAdmin], employeeCtrl.getEmployeeId);
router.post('/', [verificaToken, verificaPermisoAdmin, verificaDatosRegistroEmployee], employeeCtrl.createEmployee);
router.put('/:id', [verificaToken, verificaPermisoAdmin, verificaDatosUpdateEmployee], employeeCtrl.updateEmployee);
router.delete('/:id', [verificaToken, verificaPermisoAdmin], employeeCtrl.deleteEmployee);

module.exports = router;