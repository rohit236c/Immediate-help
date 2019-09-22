const mongoose = require('mongoose');
console.log('here');
 
mongoose.connect('mongodb://localhost/med_calling', {useNewUrlParser: true}).then(()=>{
    console.log('mongodb successfully connected');
})
.catch((err)=>{
    console.log(err);
})