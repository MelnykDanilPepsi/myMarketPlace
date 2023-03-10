import path from "path";
const __dirname = path.resolve();


 export default {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, './public/dest/'),
        filename: 'bundle.js',
    },
};