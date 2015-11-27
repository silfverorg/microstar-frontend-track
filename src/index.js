import request from 'superagent';

class Microstar {

    init(config) {
        this.config = config;

        const _session_var = (config.sessionVariables) ? config.sessionVariables : null;
        this.$_session_variables = _session_var;
    }

    track(event_name, event_data) {
        const config = this.config;
        const trackPath = config.rootPath.replace(/\/$/, '') + '/track';
        const screen = window.screen || {};
        const env = {
            userAgent: navigator.userAgent,
            screen: {
              height: screen.height,
              width: screen.width,
              colorDepth: screen.colorDepth,
            },
        };

        const payload = {
            event_name,
            event_data,
            $_env: env,
            $_session: this.$_session_variables,
        };

        request
            .post(trackPath)
            .send(payload)
            .end((err, res) => {
                if (err) {
                    console.error('Error when performing track', err);
                    return;
                }
            });
    }
};

export default new Microstar();
