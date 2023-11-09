const {jobs} = require("../mongoConfig")
const mongoDb =  require("mongodb");
const {company} = require("../mongoConfig");


const addJob = async(req) => {
    const addone = await jobs.insertOne(req.body);
    const jobid = (addone.insertedId);
    const cid = new mongoDb.ObjectId(req.body.company);
    console.log(cid);
     const d = await company.updateOne(
        { _id:cid},
        {
            $push:{
               jobs:jobid, 
            },
        },
        {
            new :true
        }
    );
    console.log(d);
    return addone
}



const getAll = async(req) => {
    return jobs.find({}).toArray();
}

const getOne = async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobid);
    
    return jobs.findOne({ _id : jobId});
}


const modify= async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobId);
    return jobs.findOneAndUpdate({ _id: jobId},{ $set: {...req.body}}, { new : true})
}

const del = async(req) => {
    const jobId = new mongoDb.ObjectId(req.params.jobId);
    return jobs.findOneAndDelete({_id: jobId})
}
module.exports = {
    addJob,
    modify,
    getAll,
    getOne,
    del
}