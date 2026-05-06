export const getWelcomeEmailTemplate = (firstName: string, email: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Service</title>
</head>
<body style="margin:0; padding:0; background:#f4f7fa; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600px" style="max-width:600px; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #6366f1, #4f46e5); padding:40px 30px; text-align:center;">
              <h1 style="color:white; margin:0; font-size:28px;">Welcome aboard! 🎉</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <p style="font-size:18px; color:#1f2937; margin:0 0 16px;">Hi <strong>${firstName}</strong>,</p>
              <p style="font-size:16px; color:#4b5563; line-height:1.6;">
                Thank you for joining <strong>Our Service</strong>. We're thrilled to have you with us!
              </p>
              
              <div style="margin:30px 0; padding:20px; background:#f8fafc; border-radius:12px; border-left:4px solid #6366f1;">
                <p style="margin:0; color:#374151; font-size:15px;">
                  <strong>Your Account:</strong><br>
                  ${email}
                </p>
              </div>

              <p style="color:#6b7280; font-size:15px;">
                Get ready to explore all the amazing features we have prepared for you.
              </p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:0 30px 40px;">
              <a href="https://homefinderke.com/login" 
                 style="background:#4f46e5; color:white; padding:14px 32px; text-decoration:none; border-radius:8px; font-weight:600; display:inline-block;">
                Go to Dashboard
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc; padding:30px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#6b7280; font-size:14px;">
                Best regards,<br>
                <strong>Our Service Team</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getAdminNotificationTemplate = (user: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New User Registered</title>
</head>
<body style="margin:0; padding:0; background:#f4f7fa; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600px" style="max-width:600px; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#dc2626; padding:30px; text-align:center;">
              <h1 style="color:white; margin:0; font-size:24px;">🔔 New User Registered</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px;">
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;"><strong>Name:</strong></td>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">${user.firstName} ${user.lastName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;"><strong>Email:</strong></td>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;"><strong>Role:</strong></td>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">${user.role}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb;"><strong>Status:</strong></td>
                  <td style="padding:12px 0; border-bottom:1px solid #e5e7eb; text-align:right;">
                    <span style="background:#22c55e; color:white; padding:4px 12px; border-radius:9999px; font-size:14px;">${user.status}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;"><strong>Registered At:</strong></td>
                  <td style="padding:12px 0; text-align:right;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc; padding:25px; text-align:center; font-size:14px; color:#6b7280;">
              Our Service Admin Panel
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getAccountApprovedTemplate = (firstName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f4f7fa; font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f4f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600px" style="max-width:600px; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:linear-gradient(135deg, #22c55e, #16a34a); padding:40px; text-align:center;">
              <h1 style="color:white; margin:0; font-size:28px;">🎉 Congratulations!</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px; text-align:center;">
              <p style="font-size:18px; color:#1f2937;">Hi <strong>${firstName}</strong>,</p>
              <p style="font-size:16px; line-height:1.7; color:#374151;">
                Your account has been successfully <strong>approved</strong>. 
                You can now fully access all features of our platform.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom:40px;">
              <a href="https://homefinderke.com/login" 
                 style="background:#22c55e; color:white; padding:14px 36px; text-decoration:none; border-radius:8px; font-weight:600;">
                Login Now
              </a>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc; padding:30px; text-align:center; color:#6b7280; font-size:14px;">
              Best regards,<br>
              <strong>Our Service Team</strong>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getAccountRejectedTemplate = (
  firstName: string,
  reason = 'suspended',
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f4f7fa; font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" style="background:#f4f7fa; padding:40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" max-width="600px" style="max-width:600px; background:white; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
          
          <tr>
            <td style="background:#ef4444; padding:40px; text-align:center;">
              <h1 style="color:white; margin:0; font-size:26px;">Account ${reason === 'suspended' ? 'Suspended' : 'Rejected'}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 30px; text-align:center; color:#374151; line-height:1.7;">
              <p>Hi <strong>${firstName}</strong>,</p>
              <p>Your account has been <strong>${reason}</strong> by our admin team.</p>
              <p>If you believe this is a mistake, please contact support.</p>
            </td>
          </tr>

          <tr>
            <td style="background:#f8fafc; padding:30px; text-align:center; color:#6b7280; font-size:14px;">
              Our Service Support Team
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getProfileUpdateTemplate = (firstName: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif; background:#f4f7fa; padding:30px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:12px; padding:30px; box-shadow:0 5px 15px rgba(0,0,0,0.05);">
    <h2 style="color:#1f2937;">Profile Updated</h2>
    <p>Hi ${firstName},</p>
    <p>Your profile information has been updated successfully.</p>
    <p>Best regards,<br>Our Service Team</p>
  </div>
</body>
</html>
`;
