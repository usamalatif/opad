const express = require('express');
const admin_routes = require('./routes/adminRoutes');
const pre_sale_stage_routes = require('./routes/presaleStageRoutes');
const user_routes = require('./routes/usersRoutes')
const presale_routes = require('./routes/presaleRoutes');
const toggleRoutes = require('./routes/toggleRoutes');
const app = express();
const cors = require('cors');
const { checkToken } = require('./controllers/userController');
require('./config/database')
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
const PORT = process.env.PORT;
app.use(cors(corsOptions));
app.use('/check-token', checkToken)
app.use(express.json());
app.use('/admin', admin_routes);
app.use('/user', user_routes);
app.use('/presale-stage', pre_sale_stage_routes)
app.use('/presale', presale_routes)
app.use("/presale", toggleRoutes);
app.get("/", (req, res) => {
    res.send("Hello, Welcome to presale !");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
