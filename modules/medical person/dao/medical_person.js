const medicalPerson = require('../model/medical_person');

const medicalPersonDao = {
    getOnePerson: function (query) {
        return new Promise((resolve, reject) => {
            medicalPerson.findOne(query, function (err, person) {
                if (err) {
                    return reject({
                        success: false,
                        status: 500,
                        message: 'Error in processing Query'
                    });
                } 
                else if(!person){
                    return reject({
                        meta: 404,
                        message: 'No User Found',
                        success: false
                    });
                }
                else {
                    return resolve({
                        success: true,
                        message: 'Successfully retrieved medically acclaimed person',
                        person
                    });
                }
            });
        });
    },
    createUser: (newPersonObj) => {
        let person = new medicalPerson(newPersonObj);
        return new Promise((resolve, reject) => {
            person
                .save(function (err, savedPerson) {
                    if (err) {
                        reject({success: false, status: 500, error: err, message: 'Error in processing Query'});
                    } else {
                        resolve({message: 'Successfully Created User', success: true, savedPerson});
                    }
                });
        });
    },
}