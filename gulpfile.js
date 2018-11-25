const { argv } = require('yargs')
const { src, dest, watch, series, parallel } = require('gulp');
const  replace = require('gulp-replace');

const srcFiles = './src/**/*';
const wabRoot = '/Users/jcc/Applications/arcgis-web-appbuilder-2.10/';
const stemapp = wabRoot + 'client/stemapp/';
const appRoot = wabRoot + 'server/apps/2/';

// Environment Files
let envFile = null;
let devEnv = require('./environments/dev.json');
let testEnv = require('./environments/test.json');
let stageEnv = require('./environments/stage.json');
let prodEnv = require('./environments/prod.json');

function run() {
    watch([srcFiles], copy);
}

function copy(cb) {
    return src(srcFiles)
        .pipe(replace('@@@servicesUrl@@@', envFile.servicesUrl))
        .pipe(dest(stemapp))
        .pipe(dest(appRoot));
    cb();
}


/*
function one(cb) {
   console.log('one');
   cb();
}

function two(cb) {
    console.log('two');
    cb();
}

function three(cb) {
    console.log('three');
    cb();
}
*/

function loadEnv(cb) {
    if(argv.env == "dev") {
        console.log("Loading development env file.");
        envFile = devEnv;
    } else if(argv.env == "test") {
        console.log("Loading test env file.");
        envFile = testEnv;
    } else if(argv.env == "stage") {
        console.log("Loading staging env file.");
        envFile = stageEnv;
    } else if(argv.env == "prod") {
        console.log("Loading production env file.");
        envFile = prodEnv;
    } else {
        console.log("Loading development env file by default.");
        envFile = devEnv;
    }

    cb();
};

//public gulp tasks
exports.default = series(loadEnv, copy);
exports.run = series(loadEnv, run);
// exports.testSeries = series(one, two, three);
// exports.testParallel = parallel(one, two, three);
