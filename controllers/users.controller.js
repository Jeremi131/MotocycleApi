exports.findAllUsers = (req, res) => {
    res.status(200).json({
        message: 'Hello From the get route',
    });

};

exports.createUser = (req, res) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Hello From the post route',
    });
};

exports.updateUser = (req, res) => {
    console.log(req.params);
    res.json({
        message: 'Hello From the patch route',
    });
};

exports.deleteUser = (req, res) => {
    console.log(req.params.id);
    res.json({
        message: 'Hello From the delete route',
    });
};
