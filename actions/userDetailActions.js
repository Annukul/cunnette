import Details from '../models/userDetails.js';

// ser Details actions
export const addDetails = async (req, res) => {
    try {
        const newDetail = new Details({
            collegeDetail: req.body.collegeDetail,
            about: req.body.about,
            skills: req.body.skills,
            dob: req.body.dob,
            contacts: req.body.contacts,
            socialLinks: req.body.socialLinks,
            address: req.body.address,
            internships: req.body.internships,
            jobs: req.body.jobs,
            certificates: req.body.certificates,
            achievements: req.body.achievements
        })

        const detail = await newDetail.save();

        res.status(200).json(detail);
    } catch (error) {
        res.status(500).json(error.message);
    }
}



