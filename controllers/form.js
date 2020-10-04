const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service : 'gmail',
	auth : {
		user : process.env.EMAIL_ADDRESS,
		pass : process.env.GMAIL_PASS
	}
}) 

exports.contactForm = (req, res) => {
    const {name,email,phone, qualification, affiliation, designation} = req.query;
    const emailData = {
        from: process.env.EMAIL_ADDRESS, 
        to: process.env.EMAIL_TO,  
        subject: `User Registration : ${process.env.APP_NAME}`,
        text: `Email Received from registration form \n Sender Name: ${name} \n Sender Designation: ${designation} \n Sender Email: ${email} \n Sender Phone number: ${phone} \n Sender Qualification: ${qualification} \n Sender Affiliation: ${affiliation}`,
        html:
            `
                <h3>Email received from Registration form</h3>
                <p><b>Sender Name:</b> ${name}</p>
                <p><b>Sender Designation:</b> ${designation}</p>
                <p><b>Sender Email:</b> ${email}</p>
                <p><b>Sender Phone number:</b> ${phone}</p>
                <p><b>Sender Qualification:</b> ${qualification}</p>
                <p><b>Sender Affiliation:</b> ${affiliation}</p>
                <hr/>
                <h5>CONFIDENTIALITY NOTICE : </h5>
                <p>The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information and may be legally protected from disclosure. If you are not the intended recipient of this message or their agent, or if this message has been addressed to you in error, please immediately alert the sender by reply email and then delete this message and any attachments. If you are not the intended recipient, you are hereby notified that any use, dissemination, copying, or storage of this message or its attachments is strictly prohibited.</p>
            `
    };

    const replyData = {
        from: process.env.EMAIL_ADDRESS, 
        to: email,
        subject: `Registration Successful : ${process.env.APP_NAME}`,
        text:`Congratulations! Your are successfully registered for ECHO-DELHI MIDTERM Virtual 2020. Please mark the webinar details: Sunday, October 11th, 2020 3:00pm-9.00 pm`,
        html:
            `
                <h1><mark>ECHO-DELHI MIDTERM Virtual 2020</mark></h1>
                <p><b>Hello ${name},</b></p>
                <p>Congratulations!</p>
                <p>You are successfully registered for ECHO-DELHI MIDTERM Virtual 2020.</p>
                <p>Please save the following event details</p>
                <p>Date: Sunday, October 11th, 2020</p>
                <p>Time: 3:00pm - 9:00 pm</p>
                <p>Please feel free to call at <a href="tel:+91-9999757744">+91-9999757744</a> in case of any Query.</p>
                <p>Regards,</p>
                <p>Cardio Web India</p>
                <hr/>
                <h5>CONFIDENTIALITY NOTICE : </h5>
                <p>The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information and may be legally protected from disclosure. If you are not the intended recipient of this message or their agent, or if this message has been addressed to you in error, please immediately alert the sender by reply email and then delete this message and any attachments. If you are not the intended recipient, you are hereby notified that any use, dissemination, copying, or storage of this message or its attachments is strictly prohibited.</p>
            `
    }
 
    transporter.sendMail(emailData,(err, info)=>{
		if (err){
            res.status(400).json({
                error: err
            });	
		} else {
            transporter.sendMail(replyData,(e,i)=>{
                if(e){
                    res.status(400).json({
                        error:e
                    })
                }
                else{
                    res.json({
                        success:true,
                        information:info
                    })
                }
            })
			res.json({
                success:true,
                information:info
            })
		}
	})
};