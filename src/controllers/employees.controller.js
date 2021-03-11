const conn = require('../database/db');

/* 
const faker = require('faker');

let newEmployee;

for (let index = 1; index <= 500; index++) {
    newEmployee = new employeeModel({
        name: faker.name.firstName() + ' ' + faker.name.lastName() ,
        position: faker.name.jobType(),
        office: faker.name.jobArea(),
        salary: Math.round(faker.commerce.price())
    });    
    
    const results = await newEmployee.save();            
}

res.send('500 REGISTROS CREADOS');
*/

const employeeCtrl = {};

employeeCtrl.getEmployees = async (req, res) => {
    try {
        const { page, paginationMin, paginationMax } = req.query;
        
        let max = 0, min = 0;
        let pagination = [];
        
        let results = await conn.model('Employees').paginate({}, {select: '-createdAt -updatedAt', limit: 10, page});

        if (parseInt(paginationMin) > 0 && parseInt(paginationMax) > 0) {
            if ( results.totalPages <= 10 ){
                min = 1;
                max = results.totalPages;
            }else {
                if ( parseInt(page) >= parseInt(paginationMin) && parseInt(page) <= parseInt(paginationMax) ) {
                    min = parseInt(paginationMin);
                    max = parseInt(paginationMax);
                }else if (parseInt(page) > parseInt(paginationMax)) {
                    min = (parseInt(page) - 10 + 1);
                    max = parseInt(page);
                }else if (parseInt(page) < parseInt(paginationMin)) {
                    min = parseInt(page);
                    max = (parseInt(page) + 10) - 1;
                }
            }
            
            for (let index = min; index <= max; index++) {
                pagination.push(index);            
            }
        }
        
        let resultado = ({
            docs: results.docs,
            totalDocs: results.totalDocs,
            limit: results.limit,
            totalPages: results.totalPages,
            page: results.page,
            pagingCounter: results.pagingCounter,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            pagination: pagination
        });

        res.status(200).json({ status: 200, error: false, message: '', results: resultado });

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

employeeCtrl.getEmployeeId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Employees').findById({_id: id}, {createdAt: 0, updatedAt: 0});

        res.status(200).json({ status: 200, error: false, message: '', results });

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

employeeCtrl.createEmployee = async (req, res) => {
    try {
        const newEmployee = conn.model('Employees')(req.body);

        const results = await newEmployee.save();
        
        res.status(200).json({ status: 200, error: false, message: '', results: {_id: results._id, name: results.name, position: results.position, office: results.office, salary: results.salary }});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

employeeCtrl.updateEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await conn.model('Employees').findByIdAndUpdate({_id: id}, req.body, {new: true, fields: '-createdAt -updatedAt'});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

employeeCtrl.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await conn.model('Employees').findByIdAndDelete({_id: id}, {select: '_id name position office salary'});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = employeeCtrl;