const departmentService = require('../services/departmentService.js');

exports.getSubjects = async function (req, res) {
    console.time('performance');
    const departmentId = req.params.departmentId;
    const result = departmentService.getSubjects(departmentId);
    return res.send(result);
};
