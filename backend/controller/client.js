import clientData from "../model/client_schema.js";

export const showClient = (req, res) => {
    clientData.find()
        .then(docs => res.status(201).json(docs))
        .catch(err => res.status(409).json(err))
}

export const addClient = async (req, res) => {
    const param = req.body;
    const validateClient = new clientData(param);
    try {
        await validateClient.save();
        res.status(201).json({ message: "1" });
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

export const deleteClient = async (req, res) => {
    const id = req.body.id;
    try {
        await clientData.deleteOne({ _id: id });
        res.status(201).json({ msg: 1 });
    } catch (error) {
        res.status(409).json({ msg: error.message });
    }
}

export const findClient = async (req, res) => {
    const id = req.body.id;
    clientData.find({ _id: id })
        .then(doc => res.send(doc))
        .catch(err => res.send(err));
}

export const updateClient = async (req, res) => {
    const obj = req.body;
    console.log(obj);
    clientData.updateOne({ _id: obj.id }, { firstName: obj.firstName, lastName: obj.lastName, mobileNo: obj.mobileNo, emailId: obj.emailId, project: obj.project })
        .then(resp => res.json({ msg: 1 }))
        .catch(err => res.json({ msg: err }));
}