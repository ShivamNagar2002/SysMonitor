console.log("hellow")

async function fetchData() {
    try {

        const response = await fetch("/api/get-system-data");
        if (!response.ok) throw new Error("Network Error ");
        const data = await response.json();
    
        // loading SystemInfo
        document.getElementById('hostNameText').innerText = data.hostname;
        document.getElementById('osName').innerText = data.platform; 
        document.getElementById('upTime').innerText =  data.uptimeHours;
        
        // loading cpu stats 
        document.getElementById('cpu_name').innerText = data.cpuBrand ;
        document.getElementById('cpu_cores').innerText = data.cpuCores ;
        document.getElementById('cpu-load-bar').value = data.currentCpuLoad ;
        document.getElementById('cpu-load').innerText = data.currentCpuLoad ;
        document.getElementById('cpuSpeed').innerText = data.cpuSpeed  ;
        document.getElementById("arch").innerText = data.architecture ;
       
        // loading memory stats 
        const memoryInUse = (data.totalMemoryGB - data.freeMemoryGB).toFixed(2) ;
        const memoryUsagePer = ((memoryInUse / data.totalMemoryGB) * 100).toFixed(2)
        
        document.getElementById('free_ram').innerText = data.freeMemoryGB ;
        document.getElementById('ram_in_use').innerText = memoryInUse ;
        document.getElementById('ram-load-bar').value = memoryUsagePer ;
        document.getElementById('ram-load').innerText = memoryUsagePer
        document.getElementById('total_ram').innerText = data.totalMemoryGB + " GB";
    }
    catch (error) {
        console.log(error)
    }

}

fetchData()
setInterval(fetchData, 3500);