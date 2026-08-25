require("dotenv").config()
const express = require("express");
const si = require("systeminformation")
const router = express.Router();
const os = require("os")


router.get("/api/get-system-data" , async (req, res) => {
    const [cpu, currentLoad] = await Promise.all([
        si.cpu(),
        si.currentLoad()
    ]);

    const systemInfo = {
        platform: os.platform(),           
        architecture: os.arch(),   
        cpuBrand : os.cpus()[0].model   ,     
        cpuCores: os.cpus().length,         
        totalMemoryGB: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), // converting into GB
        freeMemoryGB: (os.freemem() / 1024 / 1024 / 1024).toFixed(2),   
        uptimeHours: (os.uptime() / 3600).toFixed(2), // converting system uptime into hours
        hostname:(process.env.HOSTNAME) ||  os.hostname()       ,
        currentCpuLoad : currentLoad.currentLoad.toFixed(2),      // Computer host name
        cpuSpeed : cpu.speed
    };
    res.send(systemInfo);
})



router.get('', async (req, res) => {
    res.render("main.ejs" );
});

module.exports = router ;