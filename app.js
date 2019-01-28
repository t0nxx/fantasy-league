const {app} = require('./server');
const {mongoose} = require('./server');
app.listen(process.env.PORT,()=> console.log(`running on http://localhost:${process.env.PORT}`));
mongoose.connect('mongodb://localhost:27017/fantasypl', {useNewUrlParser: true})
.then(console.log('connected to db')).catch(console.log());