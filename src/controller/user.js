const controller = {
    login: (req,res) => {
        res.render('../src/views/user/login');

    },

    register: (req,res) => {
        res.render('../src/views/user/register');
    },
    reglas: (req,res) => {
        res.render('../src/views/user/reglas');
    }
}



module.exports = controller;