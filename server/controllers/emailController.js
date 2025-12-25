import { Resend } from 'resend';

const resend = new Resend("re_EW8h7YtC_6Vb1Nae9gpzPaDfPZp5vrLDc");

// Send contact form email
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, discord, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message'
      });
    }

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #667eea;
            }
            .field-label {
              font-weight: bold;
              color: #667eea;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 14px;
            }
            .message-box {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border: 1px solid #e0e0e0;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
              background: #f0f0f0;
              border-radius: 0 0 10px 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Team Aventus</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="field-label">Name</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${email}</div>
            </div>

            ${discord ? `
            <div class="field">
              <div class="field-label">Discord Username</div>
              <div class="field-value">${discord}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${subject}</div>
            </div>

            <div class="message-box">
              <div class="field-label">Message</div>
              <div class="field-value" style="margin-top: 10px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <div class="footer">
            <p>This email was sent from the Team Aventus contact form.</p>
            <p>Please respond to: ${email}</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Team Aventus Applications <no-reply@hexadev.site>',
      to: ['ankitshankhdhar2@gmail.com'],
      subject: `Contact Form: ${subject}`,
      html: htmlContent,
      reply_to: email
    });

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      data
    });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
};

// Send application email
export const sendApplicationEmail = async (req, res) => {
  try {
    const {
      applicationType,
      firstName,
      lastName,
      email,
      discord,
      country,
      primaryGame,
      currentRank,
      inGameRole,
      primaryPlatform,
      followerCount,
      positionInterest,
      portfolioLinks,
      experience,
      whyTeamAventus
    } = req.body;

    // Validation
    if (!applicationType || !firstName || !lastName || !email || !discord || !country) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create dynamic content based on application type
    let specificFields = '';
    
    if (applicationType === 'player') {
      specificFields = `
        <div class="field">
          <div class="field-label">Primary Game</div>
          <div class="field-value">${primaryGame || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="field-label">Current Rank</div>
          <div class="field-value">${currentRank || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="field-label">In-Game Role</div>
          <div class="field-value">${inGameRole || 'N/A'}</div>
        </div>
      `;
    } else if (applicationType === 'creator') {
      specificFields = `
        <div class="field">
          <div class="field-label">Primary Platform</div>
          <div class="field-value">${primaryPlatform || 'N/A'}</div>
        </div>
        <div class="field">
          <div class="field-label">Follower Count</div>
          <div class="field-value">${followerCount || 'N/A'}</div>
        </div>
      `;
    } else if (applicationType === 'staff') {
      specificFields = `
        <div class="field">
          <div class="field-label">Position Interest</div>
          <div class="field-value">${positionInterest || 'N/A'}</div>
        </div>
      `;
    }

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 700px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #00e6ff 0%, #a855f7 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              text-transform: uppercase;
            }
            .header .type {
              background: rgba(255,255,255,0.2);
              display: inline-block;
              padding: 8px 20px;
              border-radius: 20px;
              margin-top: 10px;
              font-size: 14px;
              font-weight: bold;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border: 1px solid #e0e0e0;
              border-top: none;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #00e6ff;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #00e6ff;
            }
            .field {
              margin-bottom: 15px;
              padding: 15px;
              background: white;
              border-radius: 5px;
              border-left: 4px solid #00e6ff;
            }
            .field-label {
              font-weight: bold;
              color: #00e6ff;
              font-size: 12px;
              text-transform: uppercase;
              margin-bottom: 5px;
            }
            .field-value {
              color: #333;
              font-size: 14px;
            }
            .text-box {
              background: white;
              padding: 20px;
              border-radius: 5px;
              border: 1px solid #e0e0e0;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
              background: #f0f0f0;
              border-radius: 0 0 10px 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎮 New Application Received</h1>
            <div class="type">${applicationType.toUpperCase()} APPLICATION</div>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Personal Information</div>
              <div class="field">
                <div class="field-label">Full Name</div>
                <div class="field-value">${firstName} ${lastName}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value">${email}</div>
              </div>
              <div class="field">
                <div class="field-label">Discord Username</div>
                <div class="field-value">${discord}</div>
              </div>
              <div class="field">
                <div class="field-label">Country</div>
                <div class="field-value">${country}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${applicationType === 'player' ? 'Player Details' : applicationType === 'creator' ? 'Creator Details' : 'Position Details'}</div>
              ${specificFields}
              ${portfolioLinks ? `
              <div class="field">
                <div class="field-label">Portfolio / Social Links</div>
                <div class="field-value">${portfolioLinks}</div>
              </div>
              ` : ''}
            </div>

            ${experience ? `
            <div class="section">
              <div class="section-title">Experience & Achievements</div>
              <div class="text-box">
                <div class="field-value" style="white-space: pre-wrap;">${experience}</div>
              </div>
            </div>
            ` : ''}

            ${whyTeamAventus ? `
            <div class="section">
              <div class="section-title">Why Team Aventus?</div>
              <div class="text-box">
                <div class="field-value" style="white-space: pre-wrap;">${whyTeamAventus}</div>
              </div>
            </div>
            ` : ''}
          </div>

          <div class="footer">
            <p><strong>Team Aventus Application System</strong></p>
            <p>This application was submitted on ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>Please respond to: ${email}</p>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Team Aventus Applications <no-reply@hexadev.site>',
      to: ['ankitshankhdhar2@gmail.com'],
      subject: `New ${applicationType.charAt(0).toUpperCase() + applicationType.slice(1)} Application - ${firstName} ${lastName}`,
      html: htmlContent,
      reply_to: email
      
    });
    console.log('Application email sent:', data);
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data
    });
  } catch (error) {
    console.error('Error sending application email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  }
};
