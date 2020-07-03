const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// Send grid definition class
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content){
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('kruptl2194@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }
    formatAddresses(recipients){
        return recipients.map(({email}) =>{
            return new helper.Email(email);
        });
    }
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const addClickTracking = new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(ClickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    addRecipients(){
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    //API REQUEST
    async send(){
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }
}
new Mailer()

module.exports = Mailer;