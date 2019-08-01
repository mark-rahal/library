function runningDevEnv() {
    return 'DEV' in process.env;
}

function runningInDocker() {
    return 'DOCKER' in process.env;
}

exports.getConnectionConfig = () => {
    if (runningDevEnv()) {
        var connectionConfig = {
            dbHost: 'localhost',
            dbUser: 'root',
            dbPassword: undefined,
            dbName: 'Library'
        };
        if (runningInDocker()) {
            connectionConfig.dbHost = 'library-db';
        }
        return connectionConfig;
    }
    else {
        //elastic beanstalk env vars
        var connectionConfig = {
            dbHost: process.env.RDS_HOSTNAME,
            dbUser: process.env.RDS_USERNAME,
            dbPassword: process.env.RDS_PASSWORD,
            dbName: 'Library'
        };
        return connectionConfig;
    }
}