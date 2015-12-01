import request from 'superagent';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class Microstar {

    init(config) {
        this.config = config;

        const _session_var = (config.sessionVariables) ? config.sessionVariables : {};
        _session_var._session_id = guid();
        _session_var._session_event = 0;
        this.$_session_variables = _session_var;
    }

    _increaseSessionEvent() {
      if (this.$_session_variables && typeof this.$_session_variables._session_event !== 'undefined') {
        this.$_session_variables._session_event += 1;
      }
    }

    track(event_name, event_data = {}) {
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
                this._increaseSessionEvent();
            });
    }
};

export default new Microstar();
