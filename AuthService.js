import buffer from 'buffer';

class AuthService {
    login(creds, cb){
        var basicAuth = new buffer.Buffer(creds.username+ ':' + creds.password);
        var encodedAuth = basicAuth.toString('base64');


        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status !== 401
                }
            })
            .then((response)=> {
                return response.json();
            }).then((results) => {
            return cb({success: true, results});
        }).catch((err) => {
            console.log('logon failed', err);
            return cb(err);
        })
            .finally(() => {
                cb({showProgress: false});
            });

    }
}

module.exports = new AuthService();