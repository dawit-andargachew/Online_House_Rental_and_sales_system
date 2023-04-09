const applicationModel = require('../models/applicantModel')
const tenantModel = require('../models/tenantModel')
const ownerModel = require('../models/ownerModel')

// send application request

const addApplicationRequest = async (req, res) => {
    try {
        const applicantId= req.body.applicantId
        const ownerId = req.body.ownerId
        const applicant = await tenantModel.findById(applicantId)
        const owner = await ownerModel.findById(ownerId)
        if (!applicant) {
            return res.status(404).json({message:"applicant file doesn't exist"})
        }        
        if (!owner) {
            return res.status(404).json({message:"owner file doesn't exist"})
        }
        // add to database
        const application = await applicationModel.create(req.body)
        // add the applicant and owner document
        owner.applicationId.push(application._id)
        applicant.applicationId.push(application._id)
        await owner.save()
        await applicant.save()
         return res.status(201).json({message:"application sent!"})
        
    } catch (error) {
         return res.status(404).json({message:error})
    }
}
// get all applications in database
const getAllApplictions = async (req, res) => {
    try
    {
        const applications = await applicationModel.find({})
        if (!applications) {
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json(applications)
    } catch (error) {
      return res.status(404).json({message:error})  
    }
}
// get applications that blongs to a tenant
const getTenantApplications = async (req, res) => {
    const id = req.query

    try {
        const applications = await applicationModel.findById(id)
        if (!applications) {
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json(applications)
        
    } catch (error) {
      return res.status(404).json({message:error})  
    }
}
// get all applications that belongs to a single home owner
const getOwnerApplications = async (req, res) => {
    const ownerId = req.query.ownerId;

    try {
        const applications = await applicationModel.find({ownerId});
        if (!applications) {
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json(applications)
        
    } catch (error) {
        return res.status(404).json({message:error})  
    }
}
//get all applications that belongs to a single house
const getHouseApplications = async (req, res) => {
    const id = req.query

    try {
        const applications = await applicationModel.findById(id)
        if (!applications) {
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json(applications)
        
    } catch (error) {
      return res.status(404).json({message:error})  
    }
}
// get one application details
const getSingleApplication = async (req, res) => {
    const id = req.query

    try {
        const applications = await applicationModel.findById(id)
        if (!applications) {
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json(applications)
        
    } catch (error) {
      return res.status(404).json({message:error})  
    }
}
// delete application
const deleteApplication = async (req, res) => {
    try {
        const id = req.query.id;
        const application = await applicationModel.findByIdAndDelete(id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }
        // Remove the ID of the deleted application from the houseowner and applicant documents
        const { ownerId, applicantId } = application;
        await ownerModel.findByIdAndUpdate(ownerId, { $pull: { applicationId: id } });
        await tenantModel.findByIdAndUpdate(applicantId, { $pull: { applicationId: id } });

        return res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// update an appliction
const updateAppliction = async(req, res) => {
    const id = req.body.id 
    try {
        const application = await applicationModel.findOneAndUpdate({ _id: id }, {
            ...req.body
        })

         return res.status(200).json({ message: "updated!" });
    } catch (error) {
         return res.status(500).json({ message: error.message });
    }
}



module.exports = {
    addApplicationRequest,
    getAllApplictions,
    getOwnerApplications,
    getTenantApplications,
    getHouseApplications,
    getSingleApplication,
    updateAppliction,
    deleteApplication



}