const {company} = require("../mongoConfig");
const {jobs}    = require("../mongoConfig") 
const mongoDb =  require("mongodb");

const addcompany = async(req)=>{
    const Company = await company.insertOne(req.body);
     return Company;
}

const getCompany = ()=>{
   return company.find({}).toArray();
}


const getoneCompany = (req)=>{
  const compid = new mongoDb.ObjectId(req.params.id);
  const compidData = company.findOne({_id:compid});
   return compidData;
}


const getCompanyJobs =async (req)=>{
  const companyid = new mongoDb.ObjectId(req.params.cid);
    const companyData = await company.findOne(companyid);
  const jobsid = companyData.jobs;
  const companyPromise = jobsid.map((e) => jobs.findOne(e));

  return Promise.allSettled(companyPromise);

  
}

const getCompanyJobsid = async(req,res)=>{
  const compjobId = new mongoDb.ObjectId(req.params.cjbid);
   const companyjobId = await jobs.findOne({_id:compjobId});
   return companyjobId;
  
}


module.exports = {
    addcompany, getCompany,getCompanyJobs , getoneCompany, getCompanyJobsid
}