const router = require("express").Router();
const { Intro, About, Project, Contact, Experience, Course } = require("../models/portfolioModel");
const User  = require("../models/userModel");
//get all portfolio data
router.get('/get-portfolio-data', async (req, res) => {
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const contacts = await Contact.find();
        const experiences = await Experience.find();
        const courses = await Course.find();

        res.status(200).send({
            intro: intros[0],
            about: abouts[0],
            projects: projects,
            contact: contacts[0],
            experiences: experiences,
            courses: courses,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate({
            _id: req.body._id
        },
            req.body,
            { new: true });
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro Updated Succesfully"
        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//update Contact
router.post("/update-contact", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate({
            _id: req.body._id
        },
            req.body,
            { new: true });
        res.status(200).send({
            data: contact,
            success: true,
            message: "Contact Info Updated Succesfully"
        });
    } catch (error) {
        res.status(500).send(error);

    }
});

//add-experience
router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience added Successfully"

        });
    } catch (error) {
        res.status(500).send(error);
    }

});

//update experience
router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate({
            _id: req.body._id
        },
            req.body,
            { new: true });
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Updated Succesfully"
        });
    } catch (error) {
        res.status(500).send(error);

    }
});

// Delete experience
router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findByIdAndDelete(req.body._id);
        if (!experience) {
            return res.status(404).send({
                success: false,
                message: "Experience not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Experience Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error deleting experience",
            error: error.message,
        });
    }
});

// Add Project
router.post("/add-projects", async (req, res) => {
    try {
        const { title, description, image, link, technologies } = req.body;

        // Split technologies if it is a comma-separated string
        const techArray = technologies ? technologies.split(',').map(tech => tech.trim()) : [];

        const project = new Project({
            title,
            description,
            image,
            link,
            technologies: techArray
        });

        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Project added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to add project", error });
    }
});

// Update Project
router.post("/update-projects", async (req, res) => {
    try {
        const { _id, title, description, image, link, technologies } = req.body;
        const techArray = technologies ? technologies.split(',').map(tech => tech.trim()) : [];

        const project = await Project.findByIdAndUpdate(_id, {
            title,
            description,
            image,
            link,
            technologies: techArray
        }, { new: true });

        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to update project", error });
    }
});

// Delete Project
router.post("/delete-projects", async (req, res) => {
    try {
        const { _id } = req.body;
        await Project.findByIdAndDelete(_id);
        res.status(200).send({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to delete project", error });
    }
});


// Add Course
router.post("/add-courses", async (req, res) => {
    try {
        const { title, description, image, link } = req.body;


        const course = new Course({
            title,
            image,
            link,
            description,
            
        });

        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: "Course added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to add Course", error });
    }
});

// Update course
router.post("/update-courses", async (req, res) => {
    try {
        const { _id, title, image, link,description } = req.body;

        const course = await Course.findByIdAndUpdate(_id, {
            title,
            
            image,
            link,
            description,
        }, { new: true });

        res.status(200).send({
            data: course,
            success: true,
            message: "Course updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to update Course", error });
    }
});
//delete course
router.post("/delete-courses", async (req, res) => {
    try {
        const { _id } = req.body;
        console.log("Course ID to delete:", _id);  // Debugging log
        await Course.findByIdAndDelete(_id);
        res.status(200).send({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Failed to delete course", error });
    }
});

//admin Login
router.post("/admin-login", async (req, res) => {
    try {
       const user = await User.findOne({username:req.body.username, password:req.body.password}) ;
       user.password = "";
       if(user){
        res.status(200).send({
            data: user,
            success:true,
            message:"Login Successfully"
        });
       }
       else{
        res.status(200).send({
            data:user,
            success:false,
            message: "Invalid username or password"
        });
       }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
