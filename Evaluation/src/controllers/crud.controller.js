const post = (model) => async (req, res) => {
    try{

        const item = await model.create(req.body)
        res.status(201).send(item)
    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
    
}
const getall = (model, populate1) => async(req, res) => {
    try{

        const item = await model.find().populate(populate1).lean().exec()
        res.status(201).send(item)
    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}


const getALL = (model) => async(req, res) => {
    try{

        const item = await model.find().lean().exec()
        res.status(201).send(item)
    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}

const getAll1 = (model, cityname,skill_ ) => async(req, res) => {
    try {
        const item = await model.find({city: cityname, skill_req:skill_ }).lean().exec()
        res.status(201).send(item)

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}


const getAll2 = (model, type) => async(req, res) => {
    try {
        const item = await model.find({job_type: type}).lean().exec()
        res.status(201).send(item)

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}


const getAll3 = (model, notice) => async(req, res) => {
    try {
        const item = await model.find({notice_period: notice}).lean().exec()
        res.status(201).send(item)

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}
const getAll4 = (model) => async(req, res) => {
    try {
        const item = await model.find().sort({job_rating: 1}).lean().exec()
        res.status(201).send(item)

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}

const getData = (model, populate1) => async(req, res) => {
    try{

        const item = await model.find({_id: req.params.id}).populate(populate1).lean().exec()
        res.status(201).send(item)
        

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}



const getCom = (model) => async(req, res) => {
    try {
        const item = await model.find().sort({vacancies: -1}).limit(1).lean().exec()
        res.status(201).send(item)

    }catch(e) {
        return res.status(500).json({message:e.message, status:"Failed"})
    }
}


module.exports = {
    post,
    getall,
    getAll1,
    getAll2,
    getAll3,
    getAll4,
    getCom,
    getData,
    getALL
   
}