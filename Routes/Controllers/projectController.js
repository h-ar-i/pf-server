const projects = require("./Models/projectModel");

//add project
exports.addProject=async(req,res)=>{
    console.log("inside add project request");
    console.log(req.payload);
    console.log(req.body);
    console.log(req.file);
    const {title,language,overview,github,website} = req.body
    const userId = req.payload
    const projectImage = req.file.filename
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project already available in our system,kindly another!!!!")
        }else{
            const newProject = new projects({
                title,language,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//get allprojects
exports.getAllProjects = async (req,res)=>{
    const searchKey = req.query.search
    const qurey = {
        language : {
            $regex: searchKey, $options: 'i'
        }
    }

    try{
        const allprojects = await projects.find(qurey)
        res.status(200).json(allprojects)
    }catch(err){
        res.status(401).json(err)
    }
}
//get userprojects
exports.getUserProjects = async (req,res)=>{
    const userId = req.payload
    try{
        const userprojects = await projects.find({userId})
        res.status(200).json(userprojects)
    }catch(err){
        res.status(401).json(err)
    }
}

//get home projects
exports.getHomeProjects = async (req,res)=>{
    try{
        const homeprojects = await projects.find().limit(3)
        res.status(200).json(homeprojects)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.editProject = async (req,res) => {
    console.log("inside edit project");
    const {pid} = req.params
    const {userId} = req.payload
    const {title,language,overview,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            title,language,overview,github,website,projectImage:uploadImage,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }catch(err){
        res.status(401).json(err)
    }
}

//delete
exports.removeProject = async (req,res) => {
    console.log("inside remove roject");
    const {pid} = req.params
    try{
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}