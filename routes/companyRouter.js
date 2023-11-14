const { Router } = require("express");
const {addcompany,getCompany, getCompanyJobs ,getoneCompany, getCompanyJobsid} = require("../controller/companyController");
const companyRouter = Router();


companyRouter.post("/add", async(req,res)=>{
    try {
        if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        const data = await addcompany(req);
         res.send(data);
    } catch (error) {
         console.log({err:error.message});
    }
})


companyRouter.get("/getall" , async(req,res)=>{
    try {
        // if((!req.isAuth && req.access !== "admin") && req.access !== "recruitor") throw new Error("Unauthenticated");
        // console.log(123,getCompany);
        const data = await getCompany();
        // console.log(data);
         res.send(data);
        
    } catch (error) {
        console.log({err:error.message});
        res.send({err: error.message})
    }
})

companyRouter.get("/getone/:id" ,async(req,res)=>{
    try {
        const data = await getoneCompany(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})


companyRouter.get("/companyjobs/:cid", async(req,res)=>{
     try {
        const data = await getCompanyJobs(req);
        // console.log(data);
         res.send(data);
        
     } catch (error) {
        res.send({err: error.message})
     }

})


companyRouter.get("/companyjobsid/:cjbid", async(req,res)=>{
    try {
        
        const data = await getCompanyJobsid(req);
        // console.log(data);
         res.send(data);
    } catch (error) {
        res.send({err: error.message})

        
    }
})




module.exports = companyRouter;