import request from 'superagent';

class Microstar {

    init(config) {
        this.config = config;

        const _session_var = (config.sessionVariables) ? config.sessionVariables : null;
        this.$_session_variables = _session_var;
    }

    track(event, data) {
        const config = this.config;
        const trackPath = config.rootPath.replace(/\/$/, '') + '/track';
        data.$_session_variables = this.$_session_variables;

        const payload = {
            event,
            data
        };

        console.log('request', payload, trackPath);
        request
            .post(trackPath)
            .send(payload)
            .end((err, res) => {
                if (err) {
                    console.error('Error when performing track', err);
                    return;
                }
                console.log('ok');
            });
    }
};

export default new Microstar();
